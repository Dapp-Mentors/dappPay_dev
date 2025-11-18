"use client";

import { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import { useWallet } from '@solana/wallet-adapter-react';
import { PublicKey } from '@solana/web3.js';
import {
    getProvider,
    getProviderReadonly,
    createOrganization,
    addWorker,
    fundTreasury,
    processPayroll,
    withdrawFromTreasury,
    fetchUserOrganizations,
    fetchAllOrganizations,
    fetchOrganizationDetails,
    fetchOrganizationWorkers,
    fetchWorkerDetails,
    fetchWorkersByWallet,
    checkPayrollDue,
    getOrganizationBalance,
    calculateTotalPayrollCost,
    deriveOrganizationPDA,
    deriveWorkerPDA,
} from '@/services/blockchain';

const DynamicWalletMultiButton = dynamic(
    async () => {
        const { WalletMultiButton } = await import('@solana/wallet-adapter-react-ui');
        return WalletMultiButton;
    },
    { ssr: false }
);

const TestPage = () => {
    const { publicKey, signTransaction } = useWallet();
    const [logs, setLogs] = useState<string[]>([]);
    const [loading, setLoading] = useState<string | null>(null);
    const [testData, setTestData] = useState({
        orgName: 'TechCorp',
        workerAddress: '',
        salary: '0.5',
        fundAmount: '10',
        withdrawAmount: '2',
        selectedOrgPda: '',
        selectedWorkerPda: '',
    });
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true);
    }, []);

    const addLog = (message: string, type: 'info' | 'success' | 'error' = 'info') => {
        const timestamp = new Date().toLocaleTimeString();
        const prefix = type === 'success' ? '✅' : type === 'error' ? '❌' : 'ℹ️';
        setLogs(prev => [`[${timestamp}] ${prefix} ${message}`, ...prev]);
    };

    const handleError = (error: unknown, context: string) => {
        const message = error instanceof Error ? error.message : String(error);
        addLog(`${context}: ${message}`, 'error');
        console.error(context, error);
    };

    // Generate random test data
    const generateRandomData = () => {
        const randomOrg = `Org_${Math.random().toString(36).substring(7)}`;
        const randomSalary = (Math.random() * 2 + 0.5).toFixed(2);
        const randomFund = (Math.random() * 20 + 5).toFixed(2);
        setTestData(prev => ({
            ...prev,
            orgName: randomOrg,
            salary: randomSalary,
            fundAmount: randomFund,
        }));
        addLog('Generated random test data', 'info');
    };

    // Test 1: Create Organization
    const testCreateOrganization = async () => {
        if (!publicKey || !signTransaction) {
            addLog('Please connect your wallet first', 'error');
            return;
        }

        setLoading('createOrg');
        try {
            const program = getProvider(publicKey, signTransaction);
            if (!program) throw new Error('Failed to get program');

            addLog(`Creating organization: ${testData.orgName}`, 'info');
            const tx = await createOrganization(program, publicKey, testData.orgName);

            const [orgPda] = deriveOrganizationPDA(publicKey, testData.orgName);
            setTestData(prev => ({ ...prev, selectedOrgPda: orgPda.toBase58() }));

            addLog(`Organization created! TX: ${tx}`, 'success');
            addLog(`Org PDA: ${orgPda.toBase58()}`, 'info');
        } catch (error) {
            handleError(error, 'Create Organization');
        } finally {
            setLoading(null);
        }
    };

    // Test 2: Add Worker
    const testAddWorker = async () => {
        if (!publicKey || !signTransaction) {
            addLog('Please connect your wallet first', 'error');
            return;
        }
        if (!testData.selectedOrgPda) {
            addLog('Please create an organization first or enter Org PDA', 'error');
            return;
        }

        setLoading('addWorker');
        try {
            const program = getProvider(publicKey, signTransaction);
            if (!program) throw new Error('Failed to get program');

            // Use provided worker address or generate a random one for testing
            const workerPubkey = testData.workerAddress
                ? new PublicKey(testData.workerAddress)
                : PublicKey.unique();

            addLog(`Adding worker ${workerPubkey.toBase58()} with salary ${testData.salary} SOL`, 'info');
            const tx = await addWorker(
                program,
                publicKey,
                testData.selectedOrgPda,
                workerPubkey,
                parseFloat(testData.salary)
            );

            const [workerPda] = deriveWorkerPDA(
                new PublicKey(testData.selectedOrgPda),
                workerPubkey
            );
            setTestData(prev => ({ ...prev, selectedWorkerPda: workerPda.toBase58() }));

            addLog(`Worker added! TX: ${tx}`, 'success');
            addLog(`Worker PDA: ${workerPda.toBase58()}`, 'info');
        } catch (error) {
            handleError(error, 'Add Worker');
        } finally {
            setLoading(null);
        }
    };

    // Test 3: Fund Treasury
    const testFundTreasury = async () => {
        if (!publicKey || !signTransaction) {
            addLog('Please connect your wallet first', 'error');
            return;
        }
        if (!testData.selectedOrgPda) {
            addLog('Please create an organization first or enter Org PDA', 'error');
            return;
        }

        setLoading('fundTreasury');
        try {
            const program = getProvider(publicKey, signTransaction);
            if (!program) throw new Error('Failed to get program');

            addLog(`Funding treasury with ${testData.fundAmount} SOL`, 'info');
            const tx = await fundTreasury(
                program,
                publicKey,
                testData.selectedOrgPda,
                parseFloat(testData.fundAmount)
            );

            addLog(`Treasury funded! TX: ${tx}`, 'success');
        } catch (error) {
            handleError(error, 'Fund Treasury');
        } finally {
            setLoading(null);
        }
    };

    // Test 4: Process Payroll
    const testProcessPayroll = async () => {
        if (!publicKey || !signTransaction) {
            addLog('Please connect your wallet first', 'error');
            return;
        }
        if (!testData.selectedOrgPda) {
            addLog('Please create an organization first or enter Org PDA', 'error');
            return;
        }

        setLoading('processPayroll');
        try {
            const program = getProvider(publicKey, signTransaction);
            if (!program) throw new Error('Failed to get program');

            addLog('Processing payroll for all workers...', 'info');
            const tx = await processPayroll(program, publicKey, testData.selectedOrgPda);

            addLog(`Payroll processed! TX: ${tx}`, 'success');
        } catch (error) {
            handleError(error, 'Process Payroll');
        } finally {
            setLoading(null);
        }
    };

    // Test 5: Withdraw from Treasury
    const testWithdraw = async () => {
        if (!publicKey || !signTransaction) {
            addLog('Please connect your wallet first', 'error');
            return;
        }
        if (!testData.selectedOrgPda) {
            addLog('Please create an organization first or enter Org PDA', 'error');
            return;
        }

        setLoading('withdraw');
        try {
            const program = getProvider(publicKey, signTransaction);
            if (!program) throw new Error('Failed to get program');

            addLog(`Withdrawing ${testData.withdrawAmount} SOL from treasury`, 'info');
            const tx = await withdrawFromTreasury(
                program,
                publicKey,
                testData.selectedOrgPda,
                parseFloat(testData.withdrawAmount)
            );

            addLog(`Withdrawal successful! TX: ${tx}`, 'success');
        } catch (error) {
            handleError(error, 'Withdraw from Treasury');
        } finally {
            setLoading(null);
        }
    };

    // Test 6: Fetch User Organizations
    const testFetchUserOrgs = async () => {
        if (!publicKey) {
            addLog('Please connect your wallet first', 'error');
            return;
        }

        setLoading('fetchUserOrgs');
        try {
            const program = getProviderReadonly();
            addLog('Fetching your organizations...', 'info');
            const orgs = await fetchUserOrganizations(program, publicKey);

            addLog(`Found ${orgs.length} organization(s)`, 'success');
            orgs.forEach((org, i) => {
                addLog(`${i + 1}. ${org.name} - Treasury: ${org.treasury} SOL - Workers: ${org.workersCount}`, 'info');
            });
        } catch (error) {
            handleError(error, 'Fetch User Organizations');
        } finally {
            setLoading(null);
        }
    };

    // Test 7: Fetch All Organizations
    const testFetchAllOrgs = async () => {
        setLoading('fetchAllOrgs');
        try {
            const program = getProviderReadonly();
            addLog('Fetching all organizations...', 'info');
            const orgs = await fetchAllOrganizations(program);

            addLog(`Found ${orgs.length} total organization(s)`, 'success');
            orgs.forEach((org, i) => {
                addLog(`${i + 1}. ${org.name} - Treasury: ${org.treasury} SOL`, 'info');
            });
        } catch (error) {
            handleError(error, 'Fetch All Organizations');
        } finally {
            setLoading(null);
        }
    };

    // Test 8: Fetch Organization Details
    const testFetchOrgDetails = async () => {
        if (!testData.selectedOrgPda) {
            addLog('Please enter an Org PDA', 'error');
            return;
        }

        setLoading('fetchOrgDetails');
        try {
            const program = getProviderReadonly();
            addLog(`Fetching details for org: ${testData.selectedOrgPda}`, 'info');
            const org = await fetchOrganizationDetails(program, testData.selectedOrgPda);

            addLog(`Organization: ${org.name}`, 'success');
            addLog(`Treasury: ${org.treasury} SOL`, 'info');
            addLog(`Workers Count: ${org.workersCount}`, 'info');
            addLog(`Authority: ${org.authority}`, 'info');
        } catch (error) {
            handleError(error, 'Fetch Organization Details');
        } finally {
            setLoading(null);
        }
    };

    // Test 9: Fetch Organization Workers
    const testFetchOrgWorkers = async () => {
        if (!testData.selectedOrgPda) {
            addLog('Please enter an Org PDA', 'error');
            return;
        }

        setLoading('fetchOrgWorkers');
        try {
            const program = getProviderReadonly();
            addLog(`Fetching workers for org: ${testData.selectedOrgPda}`, 'info');
            const workers = await fetchOrganizationWorkers(program, testData.selectedOrgPda);

            addLog(`Found ${workers.length} worker(s)`, 'success');
            workers.forEach((worker, i) => {
                addLog(`${i + 1}. ${worker.workerPubkey} - Salary: ${worker.salary} SOL`, 'info');
            });
        } catch (error) {
            handleError(error, 'Fetch Organization Workers');
        } finally {
            setLoading(null);
        }
    };

    // Test 10: Fetch Worker Details
    const testFetchWorkerDetails = async () => {
        if (!testData.selectedWorkerPda) {
            addLog('Please enter a Worker PDA', 'error');
            return;
        }

        setLoading('fetchWorkerDetails');
        try {
            const program = getProviderReadonly();
            addLog(`Fetching worker details: ${testData.selectedWorkerPda}`, 'info');
            const worker = await fetchWorkerDetails(program, testData.selectedWorkerPda);

            addLog(`Worker: ${worker.workerPubkey}`, 'success');
            addLog(`Salary: ${worker.salary} SOL`, 'info');
            addLog(`Last Paid: ${new Date(worker.lastPaidCycle).toLocaleString()}`, 'info');
        } catch (error) {
            handleError(error, 'Fetch Worker Details');
        } finally {
            setLoading(null);
        }
    };

    // Test 11: Fetch Workers by Wallet
    const testFetchWorkersByWallet = async () => {
        if (!publicKey) {
            addLog('Please connect your wallet first', 'error');
            return;
        }

        setLoading('fetchWorkersByWallet');
        try {
            const program = getProviderReadonly();
            addLog(`Fetching workers for wallet: ${publicKey.toBase58()}`, 'info');
            const workers = await fetchWorkersByWallet(program, publicKey);

            addLog(`Found ${workers.length} worker record(s)`, 'success');
            workers.forEach((worker, i) => {
                addLog(`${i + 1}. Org: ${worker.org} - Salary: ${worker.salary} SOL`, 'info');
            });
        } catch (error) {
            handleError(error, 'Fetch Workers by Wallet');
        } finally {
            setLoading(null);
        }
    };

    // Test 12: Check Payroll Due
    const testCheckPayrollDue = async () => {
        if (!testData.selectedOrgPda) {
            addLog('Please enter an Org PDA', 'error');
            return;
        }

        setLoading('checkPayrollDue');
        try {
            const program = getProviderReadonly();
            addLog('Checking if payroll is due...', 'info');
            const result = await checkPayrollDue(program, testData.selectedOrgPda, 'monthly');

            if (result.due) {
                addLog(`Payroll is DUE! ${result.workers.length} worker(s) need payment`, 'success');
            } else {
                addLog('Payroll is not due yet', 'info');
            }
        } catch (error) {
            handleError(error, 'Check Payroll Due');
        } finally {
            setLoading(null);
        }
    };

    // Test 13: Get Organization Balance
    const testGetOrgBalance = async () => {
        if (!testData.selectedOrgPda) {
            addLog('Please enter an Org PDA', 'error');
            return;
        }

        setLoading('getOrgBalance');
        try {
            const program = getProviderReadonly();
            addLog('Fetching organization balance...', 'info');
            const balance = await getOrganizationBalance(program, testData.selectedOrgPda);

            addLog(`Treasury Balance: ${balance} SOL`, 'success');
        } catch (error) {
            handleError(error, 'Get Organization Balance');
        } finally {
            setLoading(null);
        }
    };

    // Test 14: Calculate Total Payroll Cost
    const testCalculatePayrollCost = async () => {
        if (!testData.selectedOrgPda) {
            addLog('Please enter an Org PDA', 'error');
            return;
        }

        setLoading('calculatePayrollCost');
        try {
            const program = getProviderReadonly();
            addLog('Calculating total payroll cost...', 'info');
            const cost = await calculateTotalPayrollCost(program, testData.selectedOrgPda);

            addLog(`Total Monthly Payroll Cost: ${cost} SOL`, 'success');
        } catch (error) {
            handleError(error, 'Calculate Payroll Cost');
        } finally {
            setLoading(null);
        }
    };

    if (!isMounted) {
        return <div className="min-h-screen bg-linear-to-br from-slate-900 via-purple-900 to-slate-900 p-8">Loading...</div>;
    }

    return (
        <div className="min-h-screen bg-linear-to-br from-slate-900 via-purple-900 to-slate-900 p-8">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-6 mb-6 border border-purple-500/20">
                    <div className="flex items-center justify-between">
                        <div>
                            <h1 className="text-3xl font-bold text-white mb-2">
                                Payroll Smart Contract Test Suite
                            </h1>
                            <p className="text-slate-400">
                                Test all blockchain functions with dummy data
                            </p>
                        </div>
                        <DynamicWalletMultiButton className="bg-purple-600! hover:bg-purple-700!" />
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* Test Controls */}
                    <div className="lg:col-span-2 space-y-6">
                        {/* Input Fields */}
                        <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-6 border border-purple-500/20">
                            <h2 className="text-xl font-bold text-white mb-4">Test Data</h2>
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm text-slate-400 mb-2">Organization Name</label>
                                    <input
                                        type="text"
                                        value={testData.orgName}
                                        onChange={(e) => setTestData({ ...testData, orgName: e.target.value })}
                                        className="w-full bg-slate-900 border border-slate-700 rounded-lg px-4 py-2 text-white"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm text-slate-400 mb-2">Worker Address (optional)</label>
                                    <input
                                        type="text"
                                        value={testData.workerAddress}
                                        onChange={(e) => setTestData({ ...testData, workerAddress: e.target.value })}
                                        placeholder="Leave empty for random"
                                        className="w-full bg-slate-900 border border-slate-700 rounded-lg px-4 py-2 text-white"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm text-slate-400 mb-2">Salary (SOL)</label>
                                    <input
                                        type="number"
                                        step="0.1"
                                        value={testData.salary}
                                        onChange={(e) => setTestData({ ...testData, salary: e.target.value })}
                                        className="w-full bg-slate-900 border border-slate-700 rounded-lg px-4 py-2 text-white"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm text-slate-400 mb-2">Fund Amount (SOL)</label>
                                    <input
                                        type="number"
                                        step="0.1"
                                        value={testData.fundAmount}
                                        onChange={(e) => setTestData({ ...testData, fundAmount: e.target.value })}
                                        className="w-full bg-slate-900 border border-slate-700 rounded-lg px-4 py-2 text-white"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm text-slate-400 mb-2">Withdraw Amount (SOL)</label>
                                    <input
                                        type="number"
                                        step="0.1"
                                        value={testData.withdrawAmount}
                                        onChange={(e) => setTestData({ ...testData, withdrawAmount: e.target.value })}
                                        className="w-full bg-slate-900 border border-slate-700 rounded-lg px-4 py-2 text-white"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm text-slate-400 mb-2">Organization PDA</label>
                                    <input
                                        type="text"
                                        value={testData.selectedOrgPda}
                                        onChange={(e) => setTestData({ ...testData, selectedOrgPda: e.target.value })}
                                        placeholder="Auto-filled after creation"
                                        className="w-full bg-slate-900 border border-slate-700 rounded-lg px-4 py-2 text-white text-sm"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm text-slate-400 mb-2">Worker PDA</label>
                                    <input
                                        type="text"
                                        value={testData.selectedWorkerPda}
                                        onChange={(e) => setTestData({ ...testData, selectedWorkerPda: e.target.value })}
                                        placeholder="Auto-filled after adding worker"
                                        className="w-full bg-slate-900 border border-slate-700 rounded-lg px-4 py-2 text-white text-sm"
                                    />
                                </div>
                                <div className="flex items-end">
                                    <button
                                        onClick={generateRandomData}
                                        className="w-full bg-purple-600 hover:bg-purple-700 text-white font-medium py-2 rounded-lg transition-colors"
                                    >
                                        Generate Random Data
                                    </button>
                                </div>
                            </div>
                        </div>

                        {/* Write Functions */}
                        <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-6 border border-purple-500/20">
                            <h2 className="text-xl font-bold text-white mb-4">Write Functions (Requires Wallet)</h2>
                            <div className="grid grid-cols-2 gap-3">
                                <button
                                    onClick={testCreateOrganization}
                                    disabled={loading === 'createOrg'}
                                    className="bg-green-600 hover:bg-green-700 text-white font-medium py-3 rounded-lg transition-colors disabled:opacity-50"
                                >
                                    {loading === 'createOrg' ? 'Creating...' : '1. Create Organization'}
                                </button>
                                <button
                                    onClick={testAddWorker}
                                    disabled={loading === 'addWorker'}
                                    className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 rounded-lg transition-colors disabled:opacity-50"
                                >
                                    {loading === 'addWorker' ? 'Adding...' : '2. Add Worker'}
                                </button>
                                <button
                                    onClick={testFundTreasury}
                                    disabled={loading === 'fundTreasury'}
                                    className="bg-yellow-600 hover:bg-yellow-700 text-white font-medium py-3 rounded-lg transition-colors disabled:opacity-50"
                                >
                                    {loading === 'fundTreasury' ? 'Funding...' : '3. Fund Treasury'}
                                </button>
                                <button
                                    onClick={testProcessPayroll}
                                    disabled={loading === 'processPayroll'}
                                    className="bg-purple-600 hover:bg-purple-700 text-white font-medium py-3 rounded-lg transition-colors disabled:opacity-50"
                                >
                                    {loading === 'processPayroll' ? 'Processing...' : '4. Process Payroll'}
                                </button>
                                <button
                                    onClick={testWithdraw}
                                    disabled={loading === 'withdraw'}
                                    className="bg-red-600 hover:bg-red-700 text-white font-medium py-3 rounded-lg transition-colors disabled:opacity-50"
                                >
                                    {loading === 'withdraw' ? 'Withdrawing...' : '5. Withdraw Funds'}
                                </button>
                            </div>
                        </div>

                        {/* Read Functions */}
                        <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-6 border border-purple-500/20">
                            <h2 className="text-xl font-bold text-white mb-4">Read Functions (Read-Only)</h2>
                            <div className="grid grid-cols-2 gap-3">
                                <button
                                    onClick={testFetchUserOrgs}
                                    disabled={loading === 'fetchUserOrgs'}
                                    className="bg-slate-600 hover:bg-slate-700 text-white font-medium py-3 rounded-lg transition-colors disabled:opacity-50"
                                >
                                    {loading === 'fetchUserOrgs' ? 'Loading...' : '6. Fetch My Orgs'}
                                </button>
                                <button
                                    onClick={testFetchAllOrgs}
                                    disabled={loading === 'fetchAllOrgs'}
                                    className="bg-slate-600 hover:bg-slate-700 text-white font-medium py-3 rounded-lg transition-colors disabled:opacity-50"
                                >
                                    {loading === 'fetchAllOrgs' ? 'Loading...' : '7. Fetch All Orgs'}
                                </button>
                                <button
                                    onClick={testFetchOrgDetails}
                                    disabled={loading === 'fetchOrgDetails'}
                                    className="bg-slate-600 hover:bg-slate-700 text-white font-medium py-3 rounded-lg transition-colors disabled:opacity-50"
                                >
                                    {loading === 'fetchOrgDetails' ? 'Loading...' : '8. Fetch Org Details'}
                                </button>
                                <button
                                    onClick={testFetchOrgWorkers}
                                    disabled={loading === 'fetchOrgWorkers'}
                                    className="bg-slate-600 hover:bg-slate-700 text-white font-medium py-3 rounded-lg transition-colors disabled:opacity-50"
                                >
                                    {loading === 'fetchOrgWorkers' ? 'Loading...' : '9. Fetch Org Workers'}
                                </button>
                                <button
                                    onClick={testFetchWorkerDetails}
                                    disabled={loading === 'fetchWorkerDetails'}
                                    className="bg-slate-600 hover:bg-slate-700 text-white font-medium py-3 rounded-lg transition-colors disabled:opacity-50"
                                >
                                    {loading === 'fetchWorkerDetails' ? 'Loading...' : '10. Fetch Worker Details'}
                                </button>
                                <button
                                    onClick={testFetchWorkersByWallet}
                                    disabled={loading === 'fetchWorkersByWallet'}
                                    className="bg-slate-600 hover:bg-slate-700 text-white font-medium py-3 rounded-lg transition-colors disabled:opacity-50"
                                >
                                    {loading === 'fetchWorkersByWallet' ? 'Loading...' : '11. Fetch My Workers'}
                                </button>
                                <button
                                    onClick={testCheckPayrollDue}
                                    disabled={loading === 'checkPayrollDue'}
                                    className="bg-slate-600 hover:bg-slate-700 text-white font-medium py-3 rounded-lg transition-colors disabled:opacity-50"
                                >
                                    {loading === 'checkPayrollDue' ? 'Checking...' : '12. Check Payroll Due'}
                                </button>
                                <button
                                    onClick={testGetOrgBalance}
                                    disabled={loading === 'getOrgBalance'}
                                    className="bg-slate-600 hover:bg-slate-700 text-white font-medium py-3 rounded-lg transition-colors disabled:opacity-50"
                                >
                                    {loading === 'getOrgBalance' ? 'Loading...' : '13. Get Org Balance'}
                                </button>
                                <button
                                    onClick={testCalculatePayrollCost}
                                    disabled={loading === 'calculatePayrollCost'}
                                    className="bg-slate-600 hover:bg-slate-700 text-white font-medium py-3 rounded-lg transition-colors disabled:opacity-50"
                                >
                                    {loading === 'calculatePayrollCost' ? 'Calculating...' : '14. Calculate Cost'}
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Logs Panel */}
                    <div className="lg:col-span-1">
                        <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-6 border border-purple-500/20 sticky top-8">
                            <div className="flex items-center justify-between mb-4">
                                <h2 className="text-xl font-bold text-white">Logs</h2>
                                <button
                                    onClick={() => setLogs([])}
                                    className="text-sm text-slate-400 hover:text-white transition-colors"
                                >
                                    Clear
                                </button>
                            </div>
                            <div className="bg-slate-900 rounded-lg p-4 h-[600px] overflow-y-auto font-mono text-xs">
                                {logs.length === 0 ? (
                                    <p className="text-slate-500">No logs yet. Start testing functions...</p>
                                ) : (
                                    logs.map((log, i) => (
                                        <div key={i} className="mb-2 text-slate-300 leading-relaxed">
                                            {log}
                                        </div>
                                    ))
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TestPage;