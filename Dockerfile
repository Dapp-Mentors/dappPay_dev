# Dockerfile (improved version - explicit WORKDIR usage to avoid any confusion about directory changes)
FROM node:24-bookworm AS builder

# System dependencies for Rust + Solana/Anchor builds
RUN apt-get update && apt-get install -y --no-install-recommends \
    build-essential \
    pkg-config \
    libssl-dev \
    libudev-dev \
    libclang-dev \
    protobuf-compiler \
    curl \
    git \
    ca-certificates \
    && rm -rf /var/lib/apt/lists/*

# Install Rustup
RUN curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh -s -- -y
ENV PATH="/root/.cargo/bin:${PATH}"

# Match your exact local toolchain versions
RUN rustup install 1.91.1 && rustup default 1.91.1
RUN rustup toolchain install 1.84.1-sbpf-solana-v1.51  # the exact SBPF target you have locally

# Exact Solana CLI version you use locally
RUN sh -c "$(curl -sSfL https://release.solana.com/v3.0.10/install)" 
ENV PATH="/root/.local/share/solana/install/active_release/bin:${PATH}"

# Exact Anchor CLI version you use locally
RUN npm install -g @coral-xyz/anchor-cli@0.32.1

# Match your exact Yarn version (classic 1.22.22)
RUN npm install -g yarn@1.22.22

WORKDIR /app

# Copy only package files first for better layer caching
COPY package.json yarn.lock* package-lock.json* ./
COPY anchor/package.json anchor/yarn.lock* anchor/package-lock.json* ./anchor/

# Install root dependencies (uses yarn if yarn.lock exists, otherwise npm)
RUN yarn install --frozen-lockfile || npm ci

# Install anchor workspace dependencies
WORKDIR /app/anchor
RUN yarn install --frozen-lockfile || npm ci

# Build the Anchor program (generates IDL + .so + types in anchor/target)
RUN anchor build

# Return to root for Next.js build
WORKDIR /app

# Now copy the rest of the source code
COPY . .

# Build Next.js for production (now has access to freshly built IDL/types if the app needs them)
RUN yarn build || npm run build

# === Slim production image ===
FROM node:24-bookworm-slim

RUN apt-get update && apt-get install -y --no-install-recommends ca-certificates && rm -rf /var/lib/apt/lists/*

WORKDIR /app

# Copy only what Next.js actually needs to run
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./
COPY --from=builder /app/next.config.ts ./
COPY --from=builder /app/tsconfig.json ./
COPY --from=builder /app/public ./public
COPY --from=builder /app/app ./app
COPY --from=builder /app/components ./components
COPY --from=builder /app/lib ./lib
COPY --from=builder /app/services ./services
COPY --from=builder /app/utils ./utils
COPY --from=builder /app/postcss.config.mjs ./
COPY --from=builder /app/tailwind.config.ts* ./          
COPY --from=builder /app/next-env.d.ts ./
COPY --from=builder /app/.env*.local* ./                

# Optionally copy the built Anchor artifacts in case your frontend loads the IDL at runtime
# (e.g. import idl from '../anchor/target/idl/payroll_program.json')
COPY --from=builder /app/anchor/target/idl ./anchor/target/idl
COPY --from=builder /app/anchor/target/types ./anchor/target/types

ENV NODE_ENV=production
ENV PORT=3000

EXPOSE 3000

CMD ["node", "server.js"]   # Next.js 13+ app router uses this, or use "npm start" / "yarn start"
# Most people use: CMD ["npm", "start"]  – both work, this one is slightly faster