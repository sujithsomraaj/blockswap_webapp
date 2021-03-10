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

    render() {
        const { navbarVisible, menuOpen } = this.state
        const { walletConnected, walletAddress } = this.props
        return (
            <>
                <nav className={`${styles.navbar} ${!navbarVisible ? styles.hidden : ''}`}>
                    <div style={{display: 'flex'}}>
                        <a href="#" style={{display: 'flex', alignItems: 'center'}} className={styles.logo}>
                            Blockswap
                        </a>
                    </div>
                    <div style={{display: 'flex'}}>
                        <button className={styles['connect-button']} onClick={this.props.onModalToggle}>
                            {walletConnected ? (
                                walletAddress.slice(0, 5)+"***"+walletAddress.slice(-4)
                            ) : "Connect"}
                        </button>
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
            </>
        )
    }
}
