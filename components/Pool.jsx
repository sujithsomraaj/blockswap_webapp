import React, { Component } from 'react'
import { IoChevronDownSharp, IoChevronUpSharp } from 'react-icons/io5'
import CommunityIcon from '../public/icons/Community'
import VerifiedIcon from '../public/icons/Verified'
import styles from '../styles/components/Pool.module.css'
import modalStyles from '../styles/components/Navbar.module.css'
import { Dialog } from '@material-ui/core'
import { RiCloseFill } from 'react-icons/ri'
import {STAKING_ABI,STAKING_ADDRESS,PROVIDER} from '../utils/contracts'
import { toast } from 'react-toastify'
import { AiFillCodeSandboxCircle } from 'react-icons/ai'
import { BiEqualizer } from 'react-icons/bi'
const ethers = require('ethers')
export default class Pool extends Component {
    constructor(props) {
        super(props)
        this.state = {
            detailsVisible: false,
            stakingModalVisible: false,
            depositAmount: false,
            approved : false,
            staked : false,
            finished : false,
            staking : false,
            allowance : '',
            amount : '',
            balance : '',
            totalStaked : '',
            rFactor : ''
        }
    }

    componentDidMount = () => {
        this.fetchApproval()
        this.fetchBalance()
        this.fetchStaked()
        this.fetchAPY()
    }

    componentDidUpdate = (prevProps) => {
        if(this.props.walletAddress !== prevProps.walletAddress){
            this.fetchApproval()
            this.fetchBalance()
        }
    }

    fetchApproval = async () => {
        const {contractAddress, contractABI, walletAddress} = this.props
        if(walletAddress && contractAddress){
        let contract = new ethers.Contract(contractAddress,contractABI,PROVIDER)
        let allowance = await contract.allowance(walletAddress,STAKING_ADDRESS)
            allowance = ethers.utils.formatUnits(
                        allowance,18
                        )
        this.setState({
            allowance : allowance,
            approved : true
        })
        }
    }

    fetchBalance = async () => {
        const {contractAddress, contractABI, walletAddress} = this.props
        if(walletAddress && contractAddress){
        let contract = new ethers.Contract(contractAddress,contractABI,PROVIDER)
        let balance = await contract.balanceOf(walletAddress)
            balance = ethers.utils.formatUnits(
                        balance,18
                        )
        this.setState({
            balance : balance
        })
        }
    }

    fetchStaked = async () => {
        const {contractAddress, contractABI, walletAddress} = this.props
        if(walletAddress && contractAddress){
        let contract = new ethers.Contract(contractAddress,contractABI,PROVIDER)
        let balance = await contract.balanceOf(STAKING_ADDRESS)
            balance = ethers.utils.formatUnits(
                        balance,18
                        )
        this.setState({
            totalStaked : balance
        })
        }
    }

    fetchAPY = async () => {
        const {contractAddress} = this.props
        if(contractAddress){
        let contract = new ethers.Contract(STAKING_ADDRESS,STAKING_ABI,PROVIDER)
        let rFactor = await contract.rFactor(contractAddress)
            rFactor = ethers.utils.formatEther(rFactor)
            rFactor = parseFloat(rFactor * 3.154 * 10 ** 9).toFixed(2);
        this.setState({
            rFactor : rFactor
        })
    }
    }

    handleDetailsToggle = () => {
        this.setState(state => {
            return {
                detailsVisible: !state.detailsVisible
            }
        })
    }

    handleModalToggle = () => {
        this.setState(state => {
            return {
                stakingModalVisible: !state.stakingModalVisible
            }
        })
    }

    approve = async () => {
        this.setState({staking : true})
        const {contractAddress,contractABI,signer, totalSupply } = this.props
        let contract = new ethers.Contract(contractAddress,contractABI,signer)
        let result =  await contract.approve(
                STAKING_ADDRESS,
                ethers.utils.parseUnits(
                  `${totalSupply}`,
                  18
                )
        );
        toast(`Transaction Successfull. Refer to the hash at ${result.hash}`)
        try{
            let intervalId = setInterval(async ()=>{
                try{
                let reciept = await PROVIDER.getTransaction(result.hash)
                if(reciept){
                    this.fetchApproval()
                    this.setState({
                        approved : true
                    })
                    clearInterval(intervalId)
                }
                } catch(e){
                    console.log(e)
                }
            },5000)
        }
        catch(e){
            console.log(e)
        }
    }

    stake = async () => {
        let contract = new ethers.Contract(
            STAKING_ADDRESS,
            STAKING_ABI,
            this.props.signer
        )
        let result = await contract.stake(
            ethers.utils.parseUnits(`${this.state.amount}`,18),
            this.props.contractAddress
            )
        try{
            let intervalId = setInterval(async ()=>{
                try{
                let reciept = await PROVIDER.getTransaction(result.hash)
                if(reciept){
                    toast(`Transaction Successfull. Refer to the hash at ${result.hash}`)
                    clearInterval(intervalId)
                    this.setState({
                        stakingModalVisible : false
                    })
                }
                } catch(e){
                    console.log(e)
                }
            },5000)
        }
        catch(e){
            console.log(e)
        }
    }

    render() {
        const { detailsVisible, stakingModalVisible, approved, staked , finished, staking, totalStaked, rFactor } = this.state
        const { type, walletConnected, name, website, icon } = this.props
        return (
            <>
                <div className={`${styles.card} ${finished ? styles.inactive : ''}`}>
                    {finished && <div className={styles['finished-banner']} />}
                    <div className={styles['card-content']}>
                        {type === 'core' ? (
                            <div className={styles.title}>{name} Pool</div>
                        ) : (
                            <div className={styles.title}>Your Project? 👀 👀</div>
                        )}
                        <div className={styles['logo-container']}>
                            <div style={{flex: '1 1 0%'}}>
                                <div className={styles.logo}>
                                    <img src={type === 'core' ? icon : "/images/bunny-question.svg"} style={{height:'50px'}} alt={name}/>
                                </div>
                            </div>
                            {
                            walletConnected && (
                                <button className={`${styles['pool-action-button']} ${styles['disabled-button']}`}>Harvest</button>
                            )
                            }
                        </div>
                        <div className="flex-spaced-container">
                            <div className={styles.earnings}>
                                {type === 'core' ? '0.0000' : '???'}
                            </div>
                            {/* {approved && (
                                <button className={`${styles['pool-action-button']} ${styles['disabled-button']}`}>Compound</button>
                            )} */}
                        </div>
                        <div className={styles.token}>
                            {type === 'core' ? `${name} earned` : 'Create a pool for your token'}
                        </div>
                        {type === 'core' ? (
                            walletConnected ? (
                                approved ? (
                                    <div className={styles['button-container']}>
                                        <button className={`${styles.button}`} onClick={()=>{this.setState({approved : false})}}>Approve More</button>
                                        <div style={{width: '24px', height: '24px'}} />
                                        <button className={styles.button}  onClick={this.handleModalToggle}>
                                            Stake
                                        </button>
                                    </div>
                                ) : (
                                    <div className={styles['button-container']}>
                                        <button className={`${styles.button} ${this.state.staking ? styles['disabled-button'] : null}`} style={{width: '100%'}} disabled={staking} onClick={()=>{this.approve()}}>Approve {name}</button>
                                    </div>
                                )
                            ) : (
                                <div className={styles['button-container']}>
                                    <button className={styles.button} onClick={this.props.onModalToggle}>Unlock Wallet</button>
                                </div>
                            )
                        ) : (
                            <a href="#" className={styles['apply-button']}>Apply now</a>
                        )}
                        <div className="flex-spaced-container" style={{fontSize: '14px'}}>
                            <div>APY : </div>
                            <div className={styles['text-small']}>{type === 'core' ? `${rFactor} %` : '??'}</div>
                        </div>
                        <div className="flex-spaced-container" style={{fontSize: '14px'}}>
                            <div>{type === 'community' && '🥞  '}Your Stake:</div>
                            <div className={styles['text-small']}>{type === 'core' ? '0.0000' : '??? CAKE'}</div>
                        </div>
                    </div>
                    <div className={styles['card-footer']}>
                        <div style={{display: 'flex', alignItems: 'center'}}>
                            <div style={{flex: '1 1 0%'}}>
                                {type === 'core' ? (
                                    <div className={styles.type}>
                                        <VerifiedIcon />
                                        Core
                                    </div>
                                ) : (
                                    <div className={styles.type} style={{opacity: 0.65}}>
                                        <CommunityIcon />
                                        Community
                                    </div>
                                )}
                            </div>
                            {type === 'core' && (
                                <button className={styles['details-button']} onClick={this.handleDetailsToggle}>
                                    {detailsVisible ? "Hide" : "Details"}
                                    {detailsVisible ? (
                                        <IoChevronUpSharp size={20} style={{marginLeft: '4px', position: 'relative', top: '1px'}} />
                                    ) : (
                                        <IoChevronDownSharp size={20} style={{marginLeft: '4px', position: 'relative', top: '1px'}} />
                                    )}
                                </button>  
                            )}
                        </div>
                        {
                            detailsVisible && (
                                <div style={{marginTop: '24px'}}>
                                    <div style={{display: 'flex', alignItems: 'center', marginBottom: '4px'}}>
                                        <div style={{flex: '1 1 0%'}}>
                                            <div style={{fontSize: '14px'}}>
                                                <span role="img" aria-label="syrup">🥞 </span>
                                                Total Staked
                                            </div>
                                        </div>
                                        <div className={styles['text-small']}>{totalStaked}</div>
                                    </div>
                                    <a href={website} target="_blank" style={{fontSize: '14px', color: '#DC2410', textDecoration: 'none'}}>Project Website</a>
                                </div>
                            )
                        }
                    </div>
                </div>
                <Dialog
                    open={stakingModalVisible}
                    onClose={this.handleModalToggle}
                    onBackdropClick={this.handleModalToggle}
                    disableScrollLock
                    BackdropProps={{
                        style: {
                            backgroundColor: '#4c5711',
                            opacity: 0.6
                        }
                    }}
                    PaperProps={{
                        style: {
                            backgroundColor: '#FFF',
                            boxShadow: 'rgb(14 14 44 / 10%) 0px 20px 36px -8px, rgb(0 0 0 / 5%) 0px 1px 1px',
                            border: '1px solid rgb(233, 234, 235)',
                            borderRadius: '32px'
                        }
                    }}
                    className="connect-modal"
                >
                    <div className={modalStyles['modal-header']}>
                        <div>
                            <h2>Deposit {name} Tokens</h2>
                        </div>
                        <button className={modalStyles['close-modal-button']} onClick={this.handleModalToggle}>
                            <RiCloseFill />
                        </button>
                    </div>
                    <div className={modalStyles['modal-content']}>
						<div>
                            <div style={{display: 'flex', minHeight: '21px', marginBottom: '8px', justifyContent: 'flex-end'}}>
                                <div className={modalStyles.balance}>
                                    {
                                    this.state.balance > this.state.allowance ?
                                    this.state.allowance 
                                    :
                                    this.state.allowance > this.state.balance ?
                                    this.state.balance
                                    :
                                    this.state.balance
                                    } {name} Available
                                </div>
                            </div>
                            <div style={{display: 'flex', alignItems: 'center'}}>
                                <input className={modalStyles['deposit-input']} placeholder="Enter amount to stake" value={this.state.amount} onChange={(e)=>{this.setState({amount : e.target.value})}} />
                                <div style={{display: 'flex', alignItems: 'center'}}>
                                    <div className={modalStyles['deposit-token']}>{name}</div>
                                    <div>
                                        <button onClick={()=>{
                                            this.setState({
                                                amount : this.state.balance > this.state.allowance ? this.state.allowance 
                                                : this.state.allowance > this.state.balance ? this.state.balance : this.state.balance
                                            })
                                            }
                                        } className={modalStyles['max-button']} 
                                        >Max</button>
                                    </div>
                                </div>
                            </div>
                            <div className={modalStyles['actions-container']}>
                                <div style={{flex: '1 1 0%'}}>
                                    <button className={modalStyles['action-button']} onClick={this.handleModalToggle}>Cancel</button>
                                </div>
                                <div style={{width: '24px', height: '24px'}} />
                                <div style={{flex: '1 1 0%'}}>
                                    <button className={modalStyles['action-button-primary']} onClick={()=>{this.stake()}}>Confirm</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </Dialog>
            </>
        )
    }
}
