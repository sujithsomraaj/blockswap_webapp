import React, { Component } from 'react'
import { Dialog } from '@material-ui/core'
import { AiOutlineMenuUnfold } from 'react-icons/ai'
import { RiCloseFill } from 'react-icons/ri'
import ProfileIcon from '../public/icons/Profile'
import MetamaskIcon from '../public/icons/Metamask'
import WalletConnectIcon from '../public/icons/WalletConnect'
import QuestionIcon from '../public/icons/Question'
import MenuOpenIcon from '../public/icons/MenuOpen'
import MenuIcon from '../public/icons/Menu'
import styles from '../styles/components/Navbar.module.css'

export default class Navbar extends Component {
    constructor(props) {
        super(props)
        this.state = {
            navbarVisible: true,
            connectModalVisible: false,
            menuOpen: true,
        }
    }

    componentDidMount() {
        if (typeof window !== undefined) {
            this.prev = window.scrollY;
            window.addEventListener('scroll', this.handleNavbarVisibility);
        }
    }

    handleNavbarVisibility = (e) => {
        if (typeof window !== undefined) {
            const window = e.currentTarget;
            if (this.prev > window.scrollY) {
                this.setState({navbarVisible: true})
            } else if (this.prev < window.scrollY) {
                this.setState({navbarVisible: false})
            }
            this.prev = window.scrollY;
        }
    }

    handleMenuToggle = () => {
        this.setState(state => {
            return {
                menuOpen: !state.menuOpen,
            }
        }, () => this.props.onSidebarToggle())
    }

    handleModalToggle = () => {
        this.setState(state => {
            return {
                connectModalVisible: !state.connectModalVisible,
            }
        })
    }

    render() {
        const { navbarVisible, menuOpen, connectModalVisible } = this.state
        return (
            <>
                <nav className={`${styles.navbar} ${!navbarVisible ? styles.hidden : ''}`}>
                    <div style={{display: 'flex'}}>
                        <a href="#" style={{display: 'flex', alignItems: 'center'}} className={styles.logo}>
                            Blockswap
                        </a>
                    </div>
                    <div style={{display: 'flex'}}>
                        <button className={styles['connect-button']} onClick={this.handleModalToggle}>Connect</button>
                        <div className={styles['profile-button-container']}>
                            <a href="#" >
                                <ProfileIcon />
                            </a>
                            <div className={styles['notification-dot']} />
                        </div>
                        <button className={styles.hamburger} onClick={this.handleMenuToggle}>
                            {menuOpen ? <div style={{transform: 'rotateY(180deg)'}}><MenuOpenIcon /></div> : <MenuIcon />}
                        </button>
                    </div>
                </nav>
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
                    <div className={styles['modal-header']}>
                        <div>
                            <h2>Connect to a wallet</h2>
                        </div>
                        <button className={styles['close-modal-button']} onClick={this.handleModalToggle}>
                            <RiCloseFill />
                        </button>
                    </div>
                    <div className={styles['modal-content']}>
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
