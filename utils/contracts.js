const ethers = require('ethers')
export const TOKEN_ABI = [
    { inputs: [], stateMutability: 'nonpayable', type: 'constructor' },
    {
        anonymous: false,
        inputs: [
            { indexed: true, internalType: 'address', name: '_owner', type: 'address' },
            { indexed: true, internalType: 'address', name: '_spender', type: 'address' },
            { indexed: false, internalType: 'uint256', name: '_value', type: 'uint256' }
        ],
        name: 'Approval',
        type: 'event'
    },
    {
        anonymous: false,
        inputs: [
            { indexed: true, internalType: 'address', name: '_from', type: 'address' },
            { indexed: true, internalType: 'address', name: '_to', type: 'address' },
            { indexed: false, internalType: 'uint256', name: '_value', type: 'uint256' }
        ],
        name: 'Transfer',
        type: 'event'
    },
    {
        inputs: [
            { internalType: 'address', name: '', type: 'address' },
            { internalType: 'address', name: '', type: 'address' }
        ],
        name: 'allowance',
        outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
        stateMutability: 'view',
        type: 'function'
    },
    {
        inputs: [
            { internalType: 'address', name: '_spender', type: 'address' },
            { internalType: 'uint256', name: '_value', type: 'uint256' }
        ],
        name: 'approve',
        outputs: [{ internalType: 'bool', name: 'success', type: 'bool' }],
        stateMutability: 'nonpayable',
        type: 'function'
    },
    {
        inputs: [{ internalType: 'address', name: '', type: 'address' }],
        name: 'balanceOf',
        outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
        stateMutability: 'view',
        type: 'function'
    },
    {
        inputs: [],
        name: 'decimals',
        outputs: [{ internalType: 'uint8', name: '', type: 'uint8' }],
        stateMutability: 'view',
        type: 'function'
    },
    {
        inputs: [],
        name: 'name',
        outputs: [{ internalType: 'string', name: '', type: 'string' }],
        stateMutability: 'view',
        type: 'function'
    },
    {
        inputs: [],
        name: 'symbol',
        outputs: [{ internalType: 'string', name: '', type: 'string' }],
        stateMutability: 'view',
        type: 'function'
    },
    {
        inputs: [],
        name: 'totalSupply',
        outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
        stateMutability: 'view',
        type: 'function'
    },
    {
        inputs: [
            { internalType: 'address', name: '_to', type: 'address' },
            { internalType: 'uint256', name: '_value', type: 'uint256' }
        ],
        name: 'transfer',
        outputs: [{ internalType: 'bool', name: 'success', type: 'bool' }],
        stateMutability: 'nonpayable',
        type: 'function'
    },
    {
        inputs: [
            { internalType: 'address', name: '_from', type: 'address' },
            { internalType: 'address', name: '_to', type: 'address' },
            { internalType: 'uint256', name: '_value', type: 'uint256' }
        ],
        name: 'transferFrom',
        outputs: [{ internalType: 'bool', name: 'success', type: 'bool' }],
        stateMutability: 'nonpayable',
        type: 'function'
    }
];

export const TOKEN_ADDRESS = '0x6b0cec6b6a671569e717e6b7b1c77ae4fffe1293';

export const STAKING_ABI = [
    { inputs: [], stateMutability: 'nonpayable', type: 'constructor' },
    {
        inputs: [],
        name: 'admin',
        outputs: [{ internalType: 'address', name: '', type: 'address' }],
        stateMutability: 'view',
        type: 'function'
    },
    {
        inputs: [],
        name: 'blockSwap',
        outputs: [{ internalType: 'address', name: '', type: 'address' }],
        stateMutability: 'view',
        type: 'function'
    },
    {
        inputs: [],
        name: 'blockSwapContract',
        outputs: [{ internalType: 'contractERC20', name: '', type: 'address' }],
        stateMutability: 'view',
        type: 'function'
    },
    {
        inputs: [{ internalType: 'address', name: '_contractAddress', type: 'address' }],
        name: 'claim',
        outputs: [{ internalType: 'bool', name: '', type: 'bool' }],
        stateMutability: 'nonpayable',
        type: 'function'
    },
    {
        inputs: [{ internalType: 'address', name: '', type: 'address' }],
        name: 'decimals',
        outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
        stateMutability: 'view',
        type: 'function'
    },
    {
        inputs: [
            { internalType: 'address', name: '_user', type: 'address' },
            { internalType: 'address', name: '_contractAddress', type: 'address' }
        ],
        name: 'fetchUnclaimed',
        outputs: [{ internalType: 'uint256', name: 'claimableAmount', type: 'uint256' }],
        stateMutability: 'view',
        type: 'function'
    },
    {
        inputs: [{ internalType: 'address', name: '', type: 'address' }],
        name: 'lockTime',
        outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
        stateMutability: 'view',
        type: 'function'
    },
    {
        inputs: [{ internalType: 'address', name: '', type: 'address' }],
        name: 'rFactor',
        outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
        stateMutability: 'view',
        type: 'function'
    },
    {
        inputs: [{ internalType: 'address', name: '_newAdmin', type: 'address' }],
        name: 'revokeOwnership',
        outputs: [{ internalType: 'bool', name: '', type: 'bool' }],
        stateMutability: 'nonpayable',
        type: 'function'
    },
    {
        inputs: [
            { internalType: 'uint256', name: '_stakeAmount', type: 'uint256' },
            { internalType: 'address', name: '_contractAddress', type: 'address' }
        ],
        name: 'stake',
        outputs: [{ internalType: 'bool', name: '', type: 'bool' }],
        stateMutability: 'nonpayable',
        type: 'function'
    },
    {
        inputs: [],
        name: 'tokenContract',
        outputs: [{ internalType: 'contractERC20', name: '', type: 'address' }],
        stateMutability: 'view',
        type: 'function'
    },
    {
        inputs: [{ internalType: 'address', name: '_contractAddress', type: 'address' }],
        name: 'updateBlockSwapContract',
        outputs: [{ internalType: 'bool', name: '', type: 'bool' }],
        stateMutability: 'nonpayable',
        type: 'function'
    },
    {
        inputs: [
            { internalType: 'address', name: '_contractAddress', type: 'address' },
            { internalType: 'uint256', name: '_decimal', type: 'uint256' }
        ],
        name: 'updateDecimals',
        outputs: [{ internalType: 'bool', name: '', type: 'bool' }],
        stateMutability: 'nonpayable',
        type: 'function'
    },
    {
        inputs: [
            { internalType: 'address', name: '_contractAddress', type: 'address' },
            { internalType: 'uint256', name: '_newTime', type: 'uint256' }
        ],
        name: 'updateLockTime',
        outputs: [{ internalType: 'bool', name: '', type: 'bool' }],
        stateMutability: 'nonpayable',
        type: 'function'
    },
    {
        inputs: [
            { internalType: 'address', name: '_contractAddress', type: 'address' },
            { internalType: 'uint256', name: '_rFactor', type: 'uint256' }
        ],
        name: 'updateReward',
        outputs: [{ internalType: 'bool', name: '', type: 'bool' }],
        stateMutability: 'nonpayable',
        type: 'function'
    },
    {
        inputs: [
            { internalType: 'address', name: '', type: 'address' },
            { internalType: 'address', name: '', type: 'address' }
        ],
        name: 'users',
        outputs: [
            { internalType: 'uint256', name: 'currentStake', type: 'uint256' },
            { internalType: 'uint256', name: 'rewardsClaimed', type: 'uint256' },
            { internalType: 'uint256', name: 'blockNumber', type: 'uint256' },
            { internalType: 'uint256', name: 'rFactor', type: 'uint256' }
        ],
        stateMutability: 'view',
        type: 'function'
    }
];

export const STAKING_ADDRESS = '0x25bb0ceaffd419e764c5fa4c813f616fb585922f';
export const PROVIDER = new ethers.providers.JsonRpcProvider('https://data-seed-prebsc-2-s1.binance.org:8545/')
