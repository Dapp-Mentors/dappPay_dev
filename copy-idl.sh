#!/bin/bash
# copy-idl.sh — runs from project root

echo "Building Anchor program..."
cd anchor && anchor build || exit 1

echo "Copying IDL to lib/ folder..."
mkdir -p ../lib

# This path is correct when you're inside the anchor/ folder
cp target/idl/payroll_program.json ../lib/payroll_program.json || {
  echo "IDL not found! Build may have failed."
  exit 1
}

# Optional: copy types too (recommended)
cp target/types/payroll_program.ts ../lib/payroll_program.ts 2>/dev/null || echo "Types not generated (that's ok)"

echo "IDL copied to lib/payroll_program.json"