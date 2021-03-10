import {useState} from 'react'
import '../styles/globals.css'
import 'react-toastify/dist/ReactToastify.css'
import WalletConnectProvider from "@walletconnect/web3-provider";
const ethers = require('ethers')

function MyApp({ Component, pageProps }) {

    const [signer, setSigner] = useState(null)
    const [address, setAddress] = useState(null)
    const [connected, setConnected] = useState(false)

    const login = (type) => {
        if(type === 'metamask' || type === 'trust-wallet'){
            loginWithMetamask()
        }
        else{
            loginWithWalletConnect()
        }
    }

    const logout = () => {
        setAddress(null) 
        setConnected(false) 
        setSigner(null)
    }

    const loginWithMetamask = async () => {
        try{
          if(typeof window.ethereum !== undefined){
            let provider = new ethers.providers.Web3Provider(window.ethereum)
            await window.ethereum.enable()
            const address = await provider.listAccounts()
            setAddress(address[0])
            let signer = await provider.getSigner()
            setSigner(signer)
            setConnected(true)
          }
          else {
            // show toast with message that metamask is not found in browser
          }
        } catch(e){
            // show toast with message that error connecting to metamask
        }
    }

    const loginWithWalletConnect = async () => {
        try{
			const web3Provider = new WalletConnectProvider({
                rpc : {
					56 : 'https://bsc-dataseed.binance.org/',
				},
				qrcode : true,
				chainId : 56
            });      
			await web3Provider.enable()
			.catch(e=>{
                // error message
			})
			const provider = new ethers.providers.Web3Provider(web3Provider)
			const address = await provider.listAccounts()
            setAddress(address[0])
			const signer = provider.getSigner()
            setSigner(signer)
            setConnected(true)
		}
		catch(e){
			console.log(e)
		}
    }

    return (
            <Component 
                {...pageProps} 
                signer = {signer} 
                walletAddress = {address} 
                walletConnected = {connected} 
                login = {login} 
                logout = {logout}
                />
        );
}

export default MyApp;
