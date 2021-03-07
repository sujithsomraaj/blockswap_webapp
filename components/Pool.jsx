import React, { Component } from 'react'
import { IoChevronDownSharp, IoChevronUpSharp } from 'react-icons/io5'
import CommunityIcon from '../public/icons/Community'
import VerifiedIcon from '../public/icons/Verified'
import styles from '../styles/components/Pool.module.css'
import modalStyles from '../styles/components/Navbar.module.css'
import { Dialog } from '@material-ui/core'
import { RiCloseFill } from 'react-icons/ri'
export default class Pool extends Component {
    constructor(props) {
        super(props)
        this.state = {
            detailsVisible: false,
            stakingModalVisible: false,
            depositAmount: false,
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

    render() {
        const { detailsVisible, stakingModalVisible } = this.state
        const { type, finished, walletConnected, approved, staked } = this.props
        return (
            <>
                <div className={`${styles.card} ${finished ? styles.inactive : ''}`}>
                    {finished && <div className={styles['finished-banner']} />}
                    <div className={styles['card-content']}>
                        {type === 'core' ? (
                            <div className={styles.title}>CAKE Pool</div>
                        ) : (
                            <div className={styles.title}>Your Project? 👀 👀</div>
                        )}
                        <div className={styles['logo-container']}>
                            <div style={{flex: '1 1 0%'}}>
                                <div className={styles.logo}>
                                    <img src={type === 'core' ? "/images/CAKE.png" : "/images/bunny-question.svg"} alt="CAKE"/>
                                </div>
                            </div>
                            {walletConnected && (
                                <button className={`${styles['pool-action-button']} ${styles['disabled-button']}`}>Harvest</button>
                            )}
                        </div>
                        <div className="flex-spaced-container">
                            <div className={styles.earnings}>
                                {type === 'core' ? '0.0000' : '???'}
                            </div>
                            {approved && (
                                <button className={`${styles['pool-action-button']} ${styles['disabled-button']}`}>Compound</button>
                            )}
                        </div>
                        <div className={styles.token}>
                            {type === 'core' ? 'CAKE earned' : 'Create a pool for your token'}
                        </div>
                        {type === 'core' ? (
                            walletConnected ? (
                                approved ? (
                                    <div className={styles['button-container']}>
                                        <button className={`${styles.button} ${!staked ? styles['disabled-button'] : ''}`}>Unstake CAKE</button>
                                        <div style={{width: '24px', height: '24px'}} />
                                        <button className={styles.button} style={{padding: 0, width: '48px'}} onClick={this.handleModalToggle}>+</button>
                                    </div>
                                ) : (
                                    <div className={styles['button-container']}>
                                        <button className={styles.button} style={{width: '100%'}} onClick={this.props.onModalToggle}>Approve CAKE</button>
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
                            <div>APR:</div>
                            <div className={styles['text-small']}>{type === 'core' ? '132.37%' : '??'}</div>
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
                                                Total
                                            </div>
                                        </div>
                                        <div className={styles['text-small']}>79,384,900.171</div>
                                    </div>
                                    <a href="#" style={{fontSize: '14px', color: '#DC2410', textDecoration: 'none'}}>Project site</a>
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
                            <h2>Deposit CAKE Tokens</h2>
                        </div>
                        <button className={modalStyles['close-modal-button']} onClick={this.handleModalToggle}>
                            <RiCloseFill />
                        </button>
                    </div>
                    <div className={modalStyles['modal-content']}>
						<div>
                            <div style={{display: 'flex', minHeight: '21px', marginBottom: '8px', justifyContent: 'flex-end'}}>
                                <div className={modalStyles.balance}>0 CAKE Available</div>
                            </div>
                            <div style={{display: 'flex', alignItems: 'center'}}>
                                <input className={modalStyles['deposit-input']} placeholder="0" />
                                <div style={{display: 'flex', alignItems: 'center'}}>
                                    <div className={modalStyles['deposit-token']}>cake</div>
                                    <div>
                                        <button className={modalStyles['max-button']}>Max</button>
                                    </div>
                                </div>
                            </div>
                            <div className={modalStyles['actions-container']}>
                                <div style={{flex: '1 1 0%'}}>
                                    <button className={modalStyles['action-button']} onClick={this.handleModalToggle}>Cancel</button>
                                </div>
                                <div style={{width: '24px', height: '24px'}} />
                                <div style={{flex: '1 1 0%'}}>
                                    <button className={modalStyles['action-button-primary']} onClick={this.handleModalToggle}>Cancel</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </Dialog>
            </>
        )
    }
}
