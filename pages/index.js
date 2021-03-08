import Head from 'next/head'
import { Component } from 'react'
import Navbar from '../components/Navbar'
import Pool from '../components/Pool'
import Sidebar from '../components/Sidebar'
import { Dialog } from '@material-ui/core'
import { RiCheckboxCircleLine, RiCloseFill } from 'react-icons/ri'
import { BiLinkExternal } from 'react-icons/bi'
import { MdContentCopy } from 'react-icons/md'
import MetamaskIcon from '../public/icons/Metamask'
import WalletConnectIcon from '../public/icons/WalletConnect'
import QuestionIcon from '../public/icons/Question'
import Lottie from 'lottie-react'
import Blockchain from '../public/graphics/blockchain.json'
import styles from '../styles/pages/Pools.module.css'
import modalStyles from '../styles/components/Navbar.module.css'
export default class Home extends Component {
	constructor() {
		super()
		this.state = {
			sidebarExpanded: true,
			connectModalVisible: false,
			walletConnected: false,
			walletAddress: '',
			approved: false,
			staked: '',
			copied: false,
			stakedOnly: false,
			tab: 'active',
			pools: []
		}
	}

	componentDidMount() {
		const pools = Array.from({length: 20}, (_, i) => {
			return {
				key: i,
				type: 'core',
				finished: false
			}
		})
		pools.push({
			key: pools.length,
			type: 'community',
			finished: false
		})
		this.setState({pools})
		if (typeof window !== undefined) {
			if (window.innerWidth < 968) {
				this.setState({sidebarExpanded: false})
			}
			window.addEventListener('resize', this.handleWindowResize)
		}
	}

	handleWindowResize = () => {
		if (typeof window !== undefined) {
			if (window.innerWidth < 968) {
				this.setState({sidebarExpanded: false})
			}
		}
	}

	handleSidebarVisibility = () => {
		this.setState(state => {
			return {
				sidebarExpanded: !state.sidebarExpanded,
			}
		})
	}

	handleModalToggle = () => {
        this.setState(state => {
            return {
                connectModalVisible: !state.connectModalVisible,
            }
        })
    }

	handleStakingVisibility = (e) => {
		const { tab } = this.state
		this.setState({stakedOnly: e.target.checked}, () => {
			if (tab === 'active') {
				if (this.state.stakedOnly) {
					const pools = [
						{
							key: 0,
							type: 'community',
							finished: false
						}
					]
					this.setState({pools})
				} else {
					const pools = Array.from({length: 20}, (_, i) => {
						return {
							key: i,
							type: 'core',
							finished: false
						}
					})
					pools.push({
						key: pools.length,
						type: 'community',
						finished: false
					})
					this.setState({pools})
				}
			}
		})
	}

	setTab = (e, tab) => {
		e.preventDefault();
		const { stakedOnly } = this.state
		this.setState({tab}, () => {
			if (this.state.tab === 'active') {
				if (stakedOnly) {
					const pools = [
						{
							key: 0,
							type: 'community',
							finished: false
						}
					]
					this.setState({pools})
				} else {
					const pools = Array.from({length: 20}, (_, i) => {
						return {
							key: i,
							type: 'core',
							finished: false
						}
					})
					pools.push({
						key: pools.length,
						type: 'community',
						finished: false
					})
					this.setState({pools})
				}
			} else {
				const pools = Array.from({length: 21}, (_, i) => {
					return {
						key: i,
						type: 'core',
						finished: true
					}
				})
				this.setState({pools})
			}
		})
	}

	handleCopy = (e) => {
		e.preventDefault()
		if (typeof window !== undefined) {
			navigator.clipboard.writeText(this.state.walletAddress)
				.then(() => {
					this.setState({copied: true}, () => {
						setTimeout(
							() => this.setState({copied: false}),
							1500
						)
					})
				})
				.catch((err) => console.log(err))
		}
	}
	
	render() {
		const { sidebarExpanded, connectModalVisible, stakedOnly, tab, pools, walletConnected, walletAddress, copied, approved, staked } = this.state;
		return (
			<>
				<Head>
					<title>Blockswap</title>
					<link rel="icon" href="/favicon.ico" />
				</Head>
				<Navbar
					onSidebarToggle={this.handleSidebarVisibility}
					onModalToggle={this.handleModalToggle}
					walletConnected={walletConnected}
					walletAddress={walletAddress}
				/>
				<div style={{position: 'relative', display: 'flex'}}>
					<div className={`${styles.container} ${!sidebarExpanded ? styles['full-width'] : ''}`}>
						<div className={styles.section}>
							<div className={styles.hero}>
								<div>
									<h1>Block Pool</h1>
									<ul>
										<li>Stake CAKE to earn new tokens.</li>
										<li>You can unstake at any time.</li>
										<li>Rewards are calculated per block.</li>
									</ul>
								</div>
								{/* <img src="/images/syrup.png" width="410" height="191" style={{height: 'auto', maxWidth: '100%'}} /> */}
								<Lottie animationData={Blockchain} />
							</div>
							<div className='flex-centered-container' style={{marginBottom: '32px'}}>
								<div className='flex-centered-container' style={{marginRight: '24px'}}>
									<div className={`${styles.switch} ${stakedOnly ? styles.checked : ''}`}>
										<input type="checkbox" className={styles['checkbox']} onClick={this.handleStakingVisibility} />
										<div className={styles.thumb} />
									</div>
									<div className={styles['switch-label']}>Staked only</div>
								</div>
								<div className={styles.tabs}>
									<a href="#" className={`${tab === 'active' ? styles['tab-active'] : ''}`} onClick={(e) => this.setTab(e, 'active')}>Active</a>
									<a href="#" className={`${tab === 'inactive' ? styles['tab-active'] : ''}`} onClick={(e) => this.setTab(e, 'inactive')}>Inactive</a>
								</div>
							</div>
							<div className={styles.divider} />
							<div className={styles.pools}>
								{pools.map(({ key, type, finished }) => (
									<Pool
										key={key}
										type={type}
										finished={finished}
										onModalToggle={this.handleModalToggle}
										walletConnected={walletConnected}
										approved={approved}
										staked={staked}
									/>
								))}
							</div>
						</div>
					</div>
					<Sidebar
						active="pools"
						expanded={sidebarExpanded}
						onSidebarToggle={this.handleSidebarVisibility}
					/>
				</div>
				<Dialog
                    open={connectModalVisible}
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
                            <h2>{!walletConnected ? "Connect to a wallet" : "Your wallet"}</h2>
                        </div>
                        <button className={modalStyles['close-modal-button']} onClick={this.handleModalToggle}>
                            <RiCloseFill />
                        </button>
                    </div>
                    <div className={modalStyles['modal-content']}>
						{walletConnected ? (
							<>
								<div className={modalStyles['wallet-address']}>0x6b0cec6b6a671569e717e6b7b1c77ae4fffe1293</div>
								<div style={{display: 'flex', alignItems: 'center', marginBottom: '32px'}}>
									<a className={modalStyles['modal-link']}>View on BscScan <BiLinkExternal /></a>
									<a className={modalStyles['modal-link']} onClick={this.handleCopy}>Copy Address {!copied ? <MdContentCopy /> : <RiCheckboxCircleLine />}</a>
								</div>
								<div style={{display: 'flex', justifyContent: 'center'}}>
									<button className={modalStyles['logout-button']}>Logout</button>
								</div>
							</>
						) : (
							<>
								<button className={modalStyles['token-button']}>
									<div>Metamask</div>
									<MetamaskIcon />
								</button>
								<button className={modalStyles['token-button']}>
									<div>WalletConnect</div>
									<WalletConnectIcon />
								</button>
								<a href="#">
									<QuestionIcon />
									Learn how to connect
								</a>		
							</>
						)}
                    </div>
                </Dialog>
			</>
		)
	}
}
