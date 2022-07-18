import React, { useState, useEffect, useRef, useCallback, formRef } from 'react';

import { Table, Icon, Avatar, Tag, NFTBalance, Skeleton, Loading } from 'web3uikit';

import { Container, Spinner, Row, Col,Carousel,CarouselItem, Button, Alert, Card, CardGroup} from 'react-bootstrap';

import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
//import Web3 from "web3";

import { useMoralis } from "react-moralis";
import axios from 'axios';


import tokenContractMintAbi from './MintAbi';
import TOKENADDRESSMINT from './MintContract';



function Transactions()
{
    const { Moralis, authenticate, isAuthenticated,  logout, isAuthenticating, setUserData, web3, isWeb3Enabled, isWeb3EnableLoading, web3EnableError, user,isInitialized } = useMoralis();

  
    const [nftnumber, setNftnumber] = useState();
    const [hiddenInput,setHiddenInput] = useState("0");
    const [success, setSuccess] = useState("");
    const [loads, setLoads] = useState();
    const [spin, setSpin] = useState(<Button type="submit" style={{padding:'20px',backgroundColor:'#2FAC66',width:'100%'}} variant="success"><span style={{color:'black',fontSize:'23px'}} className="democ" >MINT NOW</span>
   </Button>);
   const [nfts, setNFts] = useState([]);
   //const [query, setQuery] = useState("");
   //const [page, setPage] = useState(1);
   //const { loading, error, list } = useFetch(query, page);
   //const loader = useRef(null);
   /*
   const handleChange = (e) => {
     setQuery(e.target.value);
   };
   
   const handleObserver = useCallback((entries) => {
     const target = entries[0];
     if (target.isIntersecting) {
       setPage((prev) => prev + 1);
     }
   }, []);
   */
   
   useEffect(()=> {
    console.log(user.get("ethAddress"));
     setLoads(<Row><Col><Skeleton width="280px" height='200px' theme="image" /><br/><Skeleton width="100px" theme="text" /><br/><Skeleton width="250px" theme="text" /><br/><Skeleton width="250px" theme="text" /></Col><Col><Skeleton width="280px" height='200px' theme="image" /><br/><Skeleton width="100px" theme="text" /><br/><Skeleton width="250px" theme="text" /><br/><Skeleton width="250px" theme="text" /></Col><Col><Skeleton width="280px" height='200px' theme="image" /><br/><Skeleton width="100px" theme="text" /><br/><Skeleton width="250px" theme="text" /><br/><Skeleton width="250px" theme="text" /></Col><Col><Skeleton width="280px" height='200px' theme="image" /><br/><Skeleton width="100px" theme="text" /><br/><Skeleton width="250px" theme="text" /><br/><Skeleton width="250px" theme="text" /></Col> </Row>);
     const timer = setTimeout(() => {
       loadNFTs();
       setLoads("");
     }, 1000);
     return () => clearTimeout(timer);
     setLoads(true);
   }, []);
   /*
   useEffect(() => {
     
     const option = {
       root: null,
       rootMargin: "20px",
       threshold: 0
     };
     const observer = new IntersectionObserver(handleObserver, option);
     if (loader.current) observer.observe(loader.current);
   }, [handleObserver]);
   */
   async function loadNFTs() {
     // what we want to load:
     // we want to get the msg.sender hook up to the signer to display the owner nfts
   
   // const meta = await axios.get("https://api-rinkeby.etherscan.io/api?module=account&action=tokennfttx&contractaddress=0xbd1fc4c871664b7326a8f5b284a4f770535aa2f5&address=0x92465167cbD448CF3C75a8159ed45B317201f5ca&page=1&offset=100&startblock=0&endblock=99999999&sort=asc&apikey=8XSE6NHVXZXHFRPRAZ6XINZJBTF8ZIKD2K");
   
   const meta = await axios.get(`https://deep-index.moralis.io/api/v2/${user.get("ethAddress")}/?chain=0x4`,{
       headers: {
           "Content-Type": "application/json",
           "x-api-key": "MVUaEZ2M9Z1puiCKK20AMQ6n1byQj4faXqUGCGsgc5RHTu12qabVlyYVSMHdjmKN",
       }
       
      });

      console.log(meta);
   
   const items = await Promise.all(meta.data.result.map(async i => {
       //console.log(items.data);
       //const tokenUri = await tokenContract.tokenURI(i.tokenId)
       // we want get the token metadata - json 
   
   
     
       //let price = ethers.utils.formatUnits(i.price.toString(), 'ether')
     let item = {
        
         hash: i.hash,
         date: i.block_timestamp,
         
         value: i.value, 
         to_address: i.to_address, 
         
    
      }
     return item
   }))
     console.log(items);
   setNFts(items)
   
   
   
   
   }
   
       
       const UploadFile = async event => {
   
        
   
           setSpin(<Button style={{padding:'20px',backgroundColor:'#2FAC66',width:'100%'}} variant="success"  disabled>
             <Spinner
               as="span"
               animation="border"
               size="lg"
               role="status"
               aria-hidden="true"
             />
             <span style={{color:'black',fontSize:'23px'}} className="democ"></span>
           </Button>)
             
            event.preventDefault();
   
           
   //const prov = await Moralis.enableWeb3({ provider: "web3Auth", clientId: "BAchUuK7Hb3v8p9lWNTcn-WjQMOlkqvjkpkXgiV4QB7khxx3C-u4wqcx1IJpjyj0a9LWH1sSW2m6c29mAAPSV_U", chainId: "0x4"});
   const prov = await Moralis.enableWeb3({ chainId: "0x61"});
   
      
     const web3 = Moralis.web3;
   
    const ethers = Moralis.web3Library;
   
    console.log(ethers);
   
   
   
    const signer = web3.getSigner();
   
     const contract = new ethers.Contract(TOKENADDRESSMINT,tokenContractMintAbi,prov);
   
    
   
   try{
   
    // const price = 100000000000000;
   
    //console.log("price" + price);
   
    
   
    const sendOptions = {
       contractAddress: TOKENADDRESSMINT,
       functionName: "mint",
       abi: tokenContractMintAbi,
       msgValue: "1000000000000000",
       
       params: {
        
        
         _mintAmount: "1"
         
       },
     };
   const transaction = await Moralis.executeFunction(sendOptions);
   
     await transaction.wait();
     console.log(transaction.hash);
     setSuccess(<Alert variant="success">
   <Alert.Heading>Success</Alert.Heading>
   <p>
     NFT Successfully Minted. Your new NFT will take a few minutes to display
   </p>
   
   </Alert>);
   
   loadNFTs();
   
   }
   catch(err)
   {
     console.log(err.data.message.err);
     setSuccess(<Alert variant="danger">
   <Alert.Heading>Error</Alert.Heading>
   <p>
     Something went Wrong {err.data.message}
   </p>
   
   </Alert>);
   
   
   loadNFTs();
   }
   
   setSpin(<Button  type="submit" style={{padding:'20px',backgroundColor:'#2FAC66',width:'100%'}} variant="success"><span style={{color:'black',fontSize:'23px'}} className="democ" >MINT NOW</span>
   </Button>);
   
   
           
           }

    return(
        
        <section>



            <Container>
            <br/><br/>
      

          <div className='p-4'>
        <h1 style={{fontSize:'20px', color:'purple'}}>Transactions</h1>
        
          <Table
  columnsConfig="230px 7fr 9fr 7fr 180px"
  
  data={nfts.sort((a,b) => a.date > b.date ? 1:-1).map((nft, index) => ( [nft.date,nft.hash,nft.to_address,Moralis.Units.FromWei(nft.value,18)]))}

  
  header={[
  <span>Date</span>,
    <span>Hash</span>,
    <span>From</span>,
  
    <span>Amt</span>
    
  ]}
  isLoading={loads}
  maxPages={3}
  customNoDataText={"Fetching Data"}
  customNoDataComponent=""
  customLoadingContent={<div><Loading size={30} spinnerColor="#2E7DAF" text="Fetching..."/></div>}
  onPageNumberChanged={function noRefCheck(){}}
  pageSize={10}
/>
         

    </div>
        </Container>
        </section>
    )
}

export default Transactions;