import React, { useState, useEffect } from 'react';
import logo from './logo.svg';
import './App.css';
import { useMoralis } from "react-moralis";
import Home from './components/Home';
import Home2 from './components/Home2';
import { Container, Navbar, Nav, Row,Col} from 'react-bootstrap';
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { WalletModal, ConnectButton, Button } from 'web3uikit';
import Transactions from './components/Transactions';


function App() {

  const { Moralis, authenticate, isAuthenticated,  logout, isAuthenticating, setUserData, web3, isWeb3Enabled, isWeb3EnableLoading, web3EnableError, user,isInitialized } = useMoralis();
  const [balance,setBalance] = useState();

  useEffect(()=> {
 console.log(isAuthenticating);
    
  }, []);

  async function fe()
{
  const meta = await axios.get(`https://deep-index.moralis.io/api/v2/${user.get("ethAddress")}/balance?chain=0x61`,{
    headers: {
        "Content-Type": "application/json",
        "x-api-key": "MVUaEZ2M9Z1puiCKK20AMQ6n1byQj4faXqUGCGsgc5RHTu12qabVlyYVSMHdjmKN",
    }
    
   });

   setBalance(Moralis.Units.FromWei(meta.data.balance,18));
}

if(!isAuthenticated)
{
  return (
    <Router>
  
    <div> 
      
    <Navbar  variant="dark" style={{backgroundColor:'black'}}>
  <Container>
    <Navbar.Brand href="/">
     
   
    </Navbar.Brand>

    <Nav className='play'>
   
    <Nav.Link href="#connect"><ConnectButton
  chainId={97}
  signingMessage="Test Signin"
/></Nav.Link>
    
   
  </Nav>
  </Container>
</Navbar>
      
    </div>
        <Routes>
          <Route path="/" element={<Home2 />}></Route>
         
         
          
          
          
        </Routes>
      </Router>
    
  );

  }

  return (
    <Router>
  
    <div> 
      
    <Navbar  variant="dark" style={{backgroundColor:'black'}}>
  <Container>
    <Navbar.Brand href="/">
     Home
   
    </Navbar.Brand>

    <Nav className='play'>
    <Nav.Link href="/transactions">Transactions</Nav.Link>
    <Nav.Link href="#connect"><ConnectButton
  chainId={97}
  signingMessage="Test Signin"
/></Nav.Link>
    
   
  </Nav>
  </Container>
</Navbar>
      
    </div>
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/transactions" element={<Transactions />}></Route>
         
          
          
          
        </Routes>
      </Router>
    
  );

}

export default App;
