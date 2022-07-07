import React, { useState, useEffect, useRef, useCallback, formRef } from 'react';

import { Table, Icon, Avatar, Tag, NFTBalance, Skeleton } from 'web3uikit';

import { Container, Spinner, Row, Col,Carousel,CarouselItem, Button, Alert, Card, CardGroup} from 'react-bootstrap';

import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
//import Web3 from "web3";

import { useMoralis } from "react-moralis";
import axios from 'axios';


import tokenContractMintAbi from './MintAbi';
import TOKENADDRESSMINT from './MintContract';
import { MerkleTree } from 'merkletreejs';
import keccak256 from "keccak256";



function Home()
{
    const { Moralis, authenticate, isAuthenticated,  logout, isAuthenticating, setUserData, web3, isWeb3Enabled, isWeb3EnableLoading, web3EnableError, user,isInitialized } = useMoralis();

  
    const [nftnumber, setNftnumber] = useState();
    const [hiddenInput,setHiddenInput] = useState("0");
    const [success, setSuccess] = useState("");
    const [loads, setLoads] = useState();
    const [spin, setSpin] = useState(<Button type="submit" style={{padding:'20px',backgroundColor:'#2FAC66',width:'100%'}} variant="success"><span style={{color:'black',fontSize:'23px'}} className="democ" >Mint</span>
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
   
   const meta = await axios.get(`https://deep-index.moralis.io/api/v2/${user.get("ethAddress")}/nft?chain=0x61&format=decimal`,{
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
   console.log(i.length);
   
      const met = await axios.get("https://gateway.pinata.cloud/ipfs/QmcjmBdmGLHHnortKq5gFkkWRQPtjKG1wwduFxANNM8xpY/"+i.token_id,
      {
        headers:{
            'Access-Control-Allow-Origin' : '*',
            'Access-Control-Allow-Methods':'GET,PUT,POST,DELETE,PATCH,OPTIONS',
             'Content-Type': 'application/json', 
            
              'authorization': 'auth'
          
          
  
        }
    });
      console.log(met.data.attributes);
       //let price = ethers.utils.formatUnits(i.price.toString(), 'ether')
     let item = {
        
         tokenId: i.token_id,
         
         image: i.metadata, 
     name: i.name,
        
        image: `https://gateway.ipfs.io/ipfs/QmUecWAgTQMad7qZ4SmLAJGJNdpxjHxL5q8W9dBz2w8vYr/${i.token_id}.jpg`,
        attributes: met.data.attributes,
         
         description: met.data.description
      }
     return item
   }))
     setNftnumber(items.length);
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
   const prov = await Moralis.enableWeb3({chainId: "0x4"});
   
      
     const web3 = Moralis.web3;
   
    const ethers = Moralis.web3Library;
   
  /*  console.log(ethers);
   
   
   
    const signer = web3.getSigner();
   
     const contract = new ethers.Contract(TOKENADDRESSMINT,tokenContractMintAbi,prov);
   
    
   
   try{
   
   
    const price = {
      contractAddress: TOKENADDRESSMINT,
      functionName: "price",
      abi: tokenContractMintAbi,
    
    
    };
  const tprice = await Moralis.executeFunction(price);
   
  console.log(tprice);
   
    const sendOptions = {
       contractAddress: TOKENADDRESSMINT,
       functionName: "presale",
       abi: tokenContractMintAbi,
       msgValue: tprice,
       
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
   
   //loadNFTs();
*/

  
try{
   const account = await Moralis.account;
   
   const it = ['0x9d1bad4c173785cdd66744d3dc60bed62e325284','//0x55A35DCBdBa3049F3cB2f24f48a3791950F8DF73']

   const leaves = it.map(x => keccak256(x));
   //console.log(leaves);
   const tree = new MerkleTree(leaves, keccak256,  { sortPairs: true })
   const buf2hex = x => '0x' + x.toString('hex')
   const getroot = buf2hex(tree.getRoot());
  
   const leaf = keccak256(account);
   
   
   const proof = tree.getProof(leaf).map(x => buf2hex(x.data))
  
   console.log(tree.verify(proof, leaf, getroot)) // true
   


  
    
      const tokenso = {
          contractAddress: TOKENADDRESSMINT,
          functionName: "isWhitelisted",
          abi: tokenContractMintAbi,
  
          params: {
           
           
              proof: proof,
              leaf: leaf,
            
          },


        
         
        };

        const test = await Moralis.executeFunction(tokenso);
   
       
       if(test == true)
       {
        setSuccess(
          <h3 style={{color:'red'}}>
        Your address is whitelisted
          </h3>);
       }
       else
       {
        setSuccess(
          <h3 style={{color:'red'}}>
        Your address is not whitelisted
          </h3>);
       }
  
  
 
        
   
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
   
   setSpin(<Button  type="submit" style={{padding:'20px',backgroundColor:'#2FAC66',width:'100%'}} variant="success"><span style={{color:'black',fontSize:'23px'}} className="democ" >CHECK IF WHITELISTED</span>
   </Button>);
   
   
           
           }


           const mintNfts = async event => {
   
        
   
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
    const prov = await Moralis.enableWeb3({chainId: "0x4"});
    
       
      const web3 = Moralis.web3;
    
     const ethers = Moralis.web3Library;
    
  
   
 try{
  const account = await Moralis.account;
   
  const it = ['0x9d1bad4c173785cdd66744d3dc60bed62e325284','0x55A35DCBdBa3049F3cB2f24f48a3791950F8DF73','0xdc7f552706774cb868E9C3d270B04b560B033C43']

  const leaves = it.map(x => keccak256(x));
  //console.log(leaves);
  const tree = new MerkleTree(leaves, keccak256,  { sortPairs: true })
  const buf2hex = x => '0x' + x.toString('hex')
  const getroot = buf2hex(tree.getRoot());

  console.log(getroot);
 
  const leaf = keccak256(account);
  
  
  const proof = tree.getProof(leaf).map(x => buf2hex(x.data))
 
  console.log(tree.verify(proof, leaf, getroot)) // true
    
    const minting = {
      contractAddress: TOKENADDRESSMINT,
      functionName: "makeNft",
      abi: tokenContractMintAbi,

      params: {
       
       
          account: account,
          id: 1,
          amount: 1,
          proof: proof
        
      },


    
     
    };

    const minted = await Moralis.executeFunction(minting);



  

   
 const receipt =   await minted.wait(1);
   
  
         
    
    }
    catch(err)
    {
      setSpin(<Button  type="submit" style={{padding:'20px',backgroundColor:'#2FAC66',width:'100%'}} variant="success"><span style={{color:'black',fontSize:'23px'}} className="democ" >Mint</span>
</Button>);
setSuccess(<Alert variant="danger">
<Alert.Heading>Error</Alert.Heading>
<p>
  Something went Wrong 
</p>

</Alert>);
     
     if(err.error.message)
     {
   setSuccess(<Alert variant="danger">
    <Alert.Heading>Error</Alert.Heading>
    <p>
      Something went Wrong {err.error.message}
    </p>
    
    </Alert>);
     }
     else
     {
      console.log("exited");
     }
  // else
   //{
    
   //}


    
   
    }

    setSpin(<Button  type="submit" style={{padding:'20px',backgroundColor:'#2FAC66',width:'100%'}} variant="success"><span style={{color:'black',fontSize:'23px'}} className="democ" >Mint</span>
    </Button>);
    
  }

    return(
        
        <section>



            <Container>
            <br/><br/>
        <h2 align="center">My NFTS</h2>
        <br/><br/>
        <form onSubmit={mintNfts}>
        <h3>Mint an NFT</h3>

        <br/><br/><div className="form-group">
         
      
        {spin}

          <br/>
          <br/>
          {success}
      </div>
        
          </form>
         
        </Container>
        </section>
       
      );

       
         

    
    
}

export default Home;