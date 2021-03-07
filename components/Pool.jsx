import React, { Component } from 'react'
import { IoChevronDownSharp, IoChevronUpSharp } from 'react-icons/io5'
import CommunityIcon from '../public/icons/Community'
import VerifiedIcon from '../public/icons/Verified'
import styles from '../styles/components/Pool.module.css'

export default class Pool extends Component {
    constructor(props) {
        super(props)
        this.state = {
            detailsVisible: false
        }
    }

    handleDetailsToggle = () => {
        this.setState(state => {
            return {
                detailsVisible: !state.detailsVisible
            }
        })
    }

    render() {
        const { detailsVisible } = this.state
        const { type, finished } = this.props
        return (
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
                    </div>
                    <div className="flex-spaced-container">
                        <div className={styles.earnings}>
                            {type === 'core' ? '0.0000' : '???'}
                        </div>
                    </div>
                    <div className={styles.token}>
                        {type === 'core' ? 'CAKE earned' : 'Create a pool for your token'}
                    </div>
                    {type === 'core' ? (
                        <div className={styles['button-container']}>
                            <button className={styles.button} onClick={this.props.onModalToggle}>Unlock Wallet</button>
                        </div>
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
        )
    }
}
