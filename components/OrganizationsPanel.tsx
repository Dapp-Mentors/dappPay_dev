// app/components/OrganizationsPanel.tsx
import { X, DollarSign, Users, TrendingUp, Plus } from 'lucide-react';
import { PayrollSummary } from '@/lib/types';

interface OrganizationsPanelProps {
    organizations: PayrollSummary[];
    selectedOrg: string | null;
    isOpen: boolean;
    onToggle: () => void;
    onSelectOrg: (id: string) => void;
    onCreateOrg: () => void;
    onViewDetails: (orgName: string) => void;
    formatLamports: (lamports: number) => string;
}

const OrganizationsPanel: React.FC<OrganizationsPanelProps> = ({
    organizations,
    selectedOrg,
    isOpen,
    onToggle,
    onSelectOrg,
    onCreateOrg,
    onViewDetails,
    formatLamports,
}) => {
    if (!isOpen) return null;

    return (
        <>
            <div className="w-1/3 flex flex-col bg-slate-900/50 border border-[#DC1FFF]/20 rounded-2xl backdrop-blur-sm overflow-hidden">
                {/* Organizations Header */}
                <div className="p-6 border-b border-slate-800 flex items-center justify-between">
                    <div>
                        <h3 className="text-xl font-bold text-white mb-1">Organizations</h3>
                        <p className="text-sm text-slate-400">{organizations.length} active</p>
                    </div>
                    <button
                        onClick={onToggle}
                        className="p-2 hover:bg-slate-800 rounded-lg transition-colors"
                    >
                        <X className="w-5 h-5 text-slate-400" />
                    </button>
                </div>

                {/* Organization Cards */}
                <div className="flex-1 overflow-y-auto p-6 space-y-4">
                    {organizations.map((org) => (
                        <div
                            key={org.id}
                            onClick={() => onSelectOrg(org.id)}
                            className={`p-5 bg-slate-800/50 border ${selectedOrg === org.id ? 'border-[#DC1FFF]' : 'border-slate-700'} rounded-xl cursor-pointer hover:border-[#DC1FFF]/50 transition-all duration-200`}
                        >
                            <div className="flex items-center justify-between mb-4">
                                <h4 className="font-bold text-white text-lg">{org.orgName}</h4>
                                <div className="w-2 h-2 bg-[#00FFA3] rounded-full"></div>
                            </div>

                            <div className="space-y-3 mb-4">
                                <div className="flex items-center justify-between">
                                    <span className="text-sm text-slate-400 flex items-center gap-2">
                                        <DollarSign className="w-4 h-4" />
                                        Treasury
                                    </span>
                                    <span className="text-sm font-semibold text-[#00FFA3]">
                                        {formatLamports(org.treasury)}
                                    </span>
                                </div>
                                <div className="flex items-center justify-between">
                                    <span className="text-sm text-slate-400 flex items-center gap-2">
                                        <Users className="w-4 h-4" />
                                        Workers
                                    </span>
                                    <span className="text-sm font-semibold text-white">
                                        {org.workers.length}
                                    </span>
                                </div>
                            </div>

                            <button
                                onClick={(e) => {
                                    e.stopPropagation();
                                    onViewDetails(org.orgName);
                                }}
                                className="w-full py-2 bg-[#DC1FFF]/20 hover:bg-[#DC1FFF]/30 text-[#DC1FFF] rounded-lg text-sm font-medium transition-colors flex items-center justify-center gap-2"
                            >
                                <TrendingUp className="w-4 h-4" />
                                View Details
                            </button>
                        </div>
                    ))}

                    <button
                        onClick={onCreateOrg}
                        className="w-full p-5 bg-slate-800/30 border-2 border-dashed border-slate-700 hover:border-[#DC1FFF]/50 rounded-xl transition-all duration-200 flex flex-col items-center justify-center gap-2 group"
                    >
                        <Plus className="w-8 h-8 text-slate-600 group-hover:text-[#DC1FFF] transition-colors" />
                        <span className="text-sm text-slate-500 group-hover:text-[#DC1FFF] font-medium transition-colors">
                            Create Organization
                        </span>
                    </button>
                </div>
            </div>
        </>
    );
};

export default OrganizationsPanel;