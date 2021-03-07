import Head from 'next/head'
import { Component } from 'react'
import Navbar from '../components/Navbar'
import Pool from '../components/Pool'
import Sidebar from '../components/Sidebar'
import { Dialog } from '@material-ui/core'
import { RiCloseFill } from 'react-icons/ri'
import MetamaskIcon from '../public/icons/Metamask'
import WalletConnectIcon from '../public/icons/WalletConnect'
import QuestionIcon from '../public/icons/Question'
import styles from '../styles/pages/Pools.module.css'
import modalStyles from '../styles/components/Navbar.module.css'
export default class Home extends Component {
	constructor() {
		super()
		this.state = {
			sidebarExpanded: true,
			connectModalVisible: false,
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
	
	render() {
		const { sidebarExpanded, connectModalVisible, stakedOnly, tab, pools } = this.state;
		return (
			<>
				<Head>
					<title>Blockswap</title>
					<link rel="icon" href="/favicon.ico" />
				</Head>
				<Navbar onSidebarToggle={this.handleSidebarVisibility} />
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
								<img src="/images/syrup.png" width="410" height="191" style={{height: 'auto', maxWidth: '100%'}} />
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
                    maxWidth="xs"
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
                            <h2>Connect to a wallet</h2>
                        </div>
                        <button className={modalStyles['close-modal-button']} onClick={this.handleModalToggle}>
                            <RiCloseFill />
                        </button>
                    </div>
                    <div className={modalStyles['modal-content']}>
                        <button>
                            <div>Metamask</div>
                            <MetamaskIcon />
                        </button>
                        <button>
                            <div>WalletConnect</div>
                            <WalletConnectIcon />
                        </button>
                        <a href="#">
                            <QuestionIcon />
                            Learn how to connect
                        </a>
                    </div>
                </Dialog>
			</>
		)
	}
}
