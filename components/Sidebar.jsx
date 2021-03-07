import React, { Component } from 'react'
import { AiOutlineCaretDown, AiOutlineCaretUp } from 'react-icons/ai'
import { FaTelegram, FaTwitter } from 'react-icons/fa'
import { IoMdSettings } from 'react-icons/io'
import HomeIcon from '../public/icons/Home'
import TradeIcon from '../public/icons/Trade'
import FarmsIcon from '../public/icons/Farms'
import styles from '../styles/components/Sidebar.module.css'
import PoolsIcon from '../public/icons/Pools'
import LotteryIcon from '../public/icons/Lottery'
import CollectiblesIcon from '../public/icons/Collectibles'
import TeamsIcon from '../public/icons/Teams'
import InfoIcon from '../public/icons/Info'
import IFOIcon from '../public/icons/IFO'
import MoreIcon from '../public/icons/More'

export default class Sidebar extends Component {
    constructor(props) {
        super(props)
        this.state = {
            alignToTop: false,
            tradeMenuVisible: false,
            teamsMenuVisible: false,
            infoMenuVisible: false,
            moreMenuVisible: false,
        }
    }

    componentDidMount() {
        if (typeof window !== undefined) {
            this.prev = window.scrollY;
            window.addEventListener('scroll', this.handleAlignToTop);
        }
    }

    handleAlignToTop = (e) => {
        if (typeof window !== undefined) {
            const window = e.currentTarget;
            if (this.prev > window.scrollY) {
                this.setState({alignToTop: false})
            } else if (this.prev < window.scrollY) {
                this.setState({alignToTop: true})
            }
            this.prev = window.scrollY;   
        }
    }

    toggleDropdown = (type) => {
        if (type === 'trade') {
            this.setState(state => {
                return {
                    tradeMenuVisible: !state.tradeMenuVisible,
                    teamsMenuVisible: false,
                    infoMenuVisible: false,
                    moreMenuVisible: false,
                }
            })
        } else if (type === 'teams') {
            this.setState(state => {
                return {
                    tradeMenuVisible: false,
                    teamsMenuVisible: !state.teamsMenuVisible,
                    infoMenuVisible: false,
                    moreMenuVisible: false,
                }
            })
        } else if (type === 'info') {
            this.setState(state => {
                return {
                    tradeMenuVisible: false,
                    teamsMenuVisible: false,
                    infoMenuVisible: !state.infoMenuVisible,
                    moreMenuVisible: false,
                }
            })
        } else if (type === 'more') {
            this.setState(state => {
                return {
                    tradeMenuVisible: false,
                    teamsMenuVisible: false,
                    infoMenuVisible: false,
                    moreMenuVisible: !state.moreMenuVisible,
                }
            })
        }
    }

    render() {
        const { alignToTop, tradeMenuVisible, teamsMenuVisible, infoMenuVisible, moreMenuVisible } = this.state
        const { expanded, active } = this.props
        return (
            <div className={`${styles.sidebar} ${!expanded ? styles.closed : ''} ${alignToTop ? styles.top : ''}`}>
                <div className={`${!expanded ? styles['text-hidden'] : ''}`} style={{display: 'flex', flexDirection: 'column', overflow: 'hidden auto', height: '100%'}}>
                    <div className={`${styles['sidebar-item']} ${active === 'home' ? styles.active : ''}`}>
                        <a>
                            <HomeIcon />
                            <div className={styles['sidebar-text']}>Home</div>
                        </a>
                    </div>
                    <div className={`${styles['sidebar-item']} ${active === 'trade' ? styles.active : ''}`} onClick={() => this.toggleDropdown('trade')}>
                        <a>
                            <TradeIcon />
                            <div className={styles['sidebar-text']}>Trade</div>
                            {tradeMenuVisible ? <AiOutlineCaretUp size={10} /> : <AiOutlineCaretDown size={10} />}
                        </a>
                    </div>
                    {expanded && (
                        <div className={`${styles.dropdown} ${!tradeMenuVisible ? styles['dropdown-closed'] : ''}`} style={{height: '96px'}}>
                            <div className={styles['dropdown-item']}>
                                Exchange
                            </div>
                            <div className={styles['dropdown-item']}>
                                Liquidity
                            </div>
                        </div>
                    )}
                    <div className={`${styles['sidebar-item']} ${active === 'farms' ? styles.active : ''}`}>
                        <a>
                            <FarmsIcon />
                            <div className={styles['sidebar-text']}>Farms</div>
                        </a>
                    </div>
                    <div className={`${styles['sidebar-item']} ${active === 'pools' ? styles.active : ''}`}>
                        <a>
                            <PoolsIcon />
                            <div className={styles['sidebar-text']}>Pools</div>
                        </a>
                    </div>
                    <div className={`${styles['sidebar-item']} ${active === 'lottery' ? styles.active : ''}`}>
                        <a>
                            <LotteryIcon />
                            <div className={styles['sidebar-text']}>Lottery</div>
                        </a>
                    </div>
                    <div className={`${styles['sidebar-item']} ${active === 'collectibles' ? styles.active : ''}`}>
                        <a>
                            <CollectiblesIcon />
                            <div className={styles['sidebar-text']}>Collectibles</div>
                        </a>
                    </div>
                    <div className={`${styles['sidebar-item']} ${active === 'teams' ? styles.active : ''}`} onClick={() => this.toggleDropdown('teams')}>
                        <a>
                            <TeamsIcon />
                            <div className={styles['sidebar-text']}>Teams & Profile</div>
                            {teamsMenuVisible ? <AiOutlineCaretUp size={10} /> : <AiOutlineCaretDown size={10} />}
                        </a>
                    </div>
                    {expanded && (
                        <div className={`${styles.dropdown} ${!teamsMenuVisible ? styles['dropdown-closed'] : ''}`} style={{height: '144px'}}>
                            <div className={styles['dropdown-item']}>
                                Leaderboard
                            </div>
                            <div className={styles['dropdown-item']}>
                                Task Center
                            </div>
                            <div className={styles['dropdown-item']}>
                                Your Profile
                            </div>
                        </div>
                    )}
                    <div className={`${styles['sidebar-item']} ${active === 'info' ? styles.active : ''}`} onClick={() => this.toggleDropdown('info')}>
                        <a>
                            <InfoIcon />
                            <div className={styles['sidebar-text']}>Info</div>
                            {infoMenuVisible ? <AiOutlineCaretUp size={10} /> : <AiOutlineCaretDown size={10} />}
                        </a>
                    </div>
                    {expanded && (
                        <div className={`${styles.dropdown} ${!infoMenuVisible ? styles['dropdown-closed'] : ''}`} style={{height: '192px'}}>
                            <div className={styles['dropdown-item']}>
                                Overview
                            </div>
                            <div className={styles['dropdown-item']}>
                                Tokens
                            </div>
                            <div className={styles['dropdown-item']}>
                                Pairs
                            </div>
                            <div className={styles['dropdown-item']}>
                                Accounts
                            </div>
                        </div>
                    )}
                    <div className={`${styles['sidebar-item']} ${active === 'ifo' ? styles.active : ''}`}>
                        <a>
                            <IFOIcon />
                            <div className={styles['sidebar-text']}>IFO</div>
                        </a>
                    </div>
                    <div className={`${styles['sidebar-item']} ${active === 'more' ? styles.active : ''}`} onClick={() => this.toggleDropdown('more')}>
                        <a>
                            <MoreIcon />
                            <div className={styles['sidebar-text']}>More</div>
                            {moreMenuVisible ? <AiOutlineCaretUp size={10} /> : <AiOutlineCaretDown size={10} />}
                        </a>
                    </div>
                    {expanded && (
                        <div className={`${styles.dropdown} ${!moreMenuVisible ? styles['dropdown-closed'] : ''}`} style={{height: '192px'}}>
                            <div className={styles['dropdown-item']}>
                                Voting
                            </div>
                            <div className={styles['dropdown-item']}>
                                Github
                            </div>
                            <div className={styles['dropdown-item']}>
                                Docs
                            </div>
                            <div className={styles['dropdown-item']}>
                                Blog
                            </div>
                        </div>
                    )}
                </div>
                <div className={styles['sidebar-footer']}>
                    {
                        expanded ?

                        <div className="container-padding-16">
                        
                        <a href="#">$10.953</a>
                            <div style={{display: 'flex'}}>
                                <a href="#">
                                    <FaTelegram size={18} style={{marginRight: '24px', flexShrink: 0}} />
                                </a>
                                <a href="#">
                                    <FaTwitter size={18} style={{flexShrink: 0}} />
                                </a>
                            </div>
                        </div>

                        :

                        <button className={styles['settings-button']} data-expanded={expanded.toString()} onClick={() => this.props.onSidebarToggle()}>
                            <IoMdSettings size={22} />
                        </button>
                    }
                </div>
            </div>
        )
    }
}
