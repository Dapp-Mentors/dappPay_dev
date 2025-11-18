// app/components/OrganizationsPanel.tsx
import { X, DollarSign, Users, TrendingUp } from 'lucide-react';
import { PayrollSummary } from '@/lib/types';

interface OrganizationsPanelProps {
    organizations: PayrollSummary[];
    selectedOrg: string | null;
    isOpen: boolean;
    onToggle: () => void;
    onSelectOrg: (id: string) => void;
    onViewDetails: (orgName: string) => void;
    formatLamports: (lamports: number) => string;
}

const OrganizationsPanel: React.FC<OrganizationsPanelProps> = ({
    organizations,
    selectedOrg,
    isOpen,
    onToggle,
    onSelectOrg,
    onViewDetails,
    formatLamports,
}) => {
    if (!isOpen) return null;

    return (
        <>
            {/* Mobile Overlay */}
            <div
                className="lg:hidden fixed inset-0 bg-black/60 backdrop-blur-sm z-40"
                onClick={onToggle}
            />

            {/* Panel */}
            <div className="fixed lg:relative inset-x-0 bottom-0 lg:inset-auto lg:w-1/3 max-h-[85vh] lg:max-h-none z-50 flex flex-col bg-slate-900/95 lg:bg-slate-900/50 border-t lg:border border-[#DC1FFF]/20 rounded-t-2xl lg:rounded-2xl backdrop-blur-sm overflow-hidden">
                {/* Organizations Header */}
                <div className="p-4 sm:p-6 border-b border-slate-800 flex items-center justify-between shrink-0">
                    <div>
                        <h3 className="text-lg sm:text-xl font-bold text-white mb-1">Organizations</h3>
                        <p className="text-xs sm:text-sm text-slate-400">{organizations.length} active</p>
                    </div>
                    <button
                        onClick={onToggle}
                        className="p-2 hover:bg-slate-800 rounded-lg transition-colors"
                    >
                        <X className="w-5 h-5 text-slate-400" />
                    </button>
                </div>

                {/* Organization Cards */}
                <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-3 sm:space-y-4">
                    {organizations.map((org) => (
                        <div
                            key={org.id}
                            onClick={() => onSelectOrg(org.id)}
                            className={`p-4 sm:p-5 bg-slate-800/50 border ${selectedOrg === org.id ? 'border-[#DC1FFF]' : 'border-slate-700'} rounded-xl cursor-pointer hover:border-[#DC1FFF]/50 transition-all duration-200`}
                        >
                            <div className="flex items-center justify-between mb-3 sm:mb-4">
                                <h4 className="font-bold text-white text-base sm:text-lg truncate pr-2">{org.orgName}</h4>
                                <div className="w-2 h-2 bg-[#00FFA3] rounded-full shrink-0"></div>
                            </div>

                            <div className="space-y-2 sm:space-y-3 mb-3 sm:mb-4">
                                <div className="flex items-center justify-between">
                                    <span className="text-xs sm:text-sm text-slate-400 flex items-center gap-2">
                                        <DollarSign className="w-3 h-3 sm:w-4 sm:h-4" />
                                        Treasury
                                    </span>
                                    <span className="text-xs sm:text-sm font-semibold text-[#00FFA3]">
                                        {formatLamports(org.treasury)}
                                        {/* {org.treasury} */}
                                    </span>
                                </div>
                                <div className="flex items-center justify-between">
                                    <span className="text-xs sm:text-sm text-slate-400 flex items-center gap-2">
                                        <Users className="w-3 h-3 sm:w-4 sm:h-4" />
                                        Workers
                                    </span>
                                    <span className="text-xs sm:text-sm font-semibold text-white">
                                        {org.workers.length}
                                    </span>
                                </div>
                            </div>

                            <button
                                onClick={(e) => {
                                    e.stopPropagation();
                                    onViewDetails(org.orgName);
                                }}
                                className="w-full py-2 bg-[#DC1FFF]/20 hover:bg-[#DC1FFF]/30 text-[#DC1FFF] rounded-lg text-xs sm:text-sm font-medium transition-colors flex items-center justify-center gap-2"
                            >
                                <TrendingUp className="w-3 h-3 sm:w-4 sm:h-4" />
                                View Details
                            </button>
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
};

export default OrganizationsPanel;