import React, { useState, useEffect, useRef, useCallback, formRef } from 'react';

import { Table, Icon, Avatar, Tag, NFTBalance, Skeleton } from 'web3uikit';

import { Container, Spinner, Row, Col,Carousel,CarouselItem, Button, Alert, Card, CardGroup, Form} from 'react-bootstrap';

import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
//import Web3 from "web3";
import { useMoralisWeb3Api } from "react-moralis";
import { useMoralis } from "react-moralis";
import axios from 'axios';
import { getDocs, collection, doc } from "firebase/firestore";
import { db } from "./firebase-config";


import tokenContractMintAbi from './MintAbi';
import TOKENADDRESSMINT from './MintContract';
import { MerkleTree } from 'merkletreejs';
import keccak256 from "keccak256";



function Home()
{
    const { Moralis, authenticate, isAuthenticated,  logout, isAuthenticating, setUserData, web3, isWeb3Enabled, isWeb3EnableLoading, web3EnableError, user,isInitialized } = useMoralis();

    const Web3Api = useMoralisWeb3Api();
    const [accountLists, setAccountList] = useState([]);
    const postsCollectionRef = collection(db, "whitelist");
    const [nftnumber, setNftnumber] = useState();
    const [hiddenInput,setHiddenInput] = useState("0");
    const [success, setSuccess] = useState("");
    const [level,setLevel] = useState("1");
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

 /*  const fetchTokenIdMetadata = async () => {
    const options = {
      address: "0x09cE49970F8B3224aFA2eaf4026c749A9a131F33",
      token_id: "77",
      chain: "bsc",
    };
    const tokenIdMetadata = await Web3Api.token.getTokenIdMetadata(options);
    console.log(tokenIdMetadata);
  };
   */
   useEffect(()=> {

    const getPosts = async () => {
      const data = await getDocs(postsCollectionRef);
    //  console.log(data.docs[0]._document.data.value.mapValue.fields.creator.mapValue.fields.name.stringValue);
    console.log(data.docs[0]._document.data.value.mapValue.fields.address.stringValue);
      setAccountList(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
      const t = data.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
      const querySnapshot = await getDocs(postsCollectionRef);
//querySnapshot.forEach((doc) => {
  // doc.data() is never undefined for query doc snapshots
  //console.log(doc.data().address);
//});
console.log(querySnapshot.query);
    };

    getPosts();

    //fetchTokenIdMetadata();
    console.log(user.get("ethAddress"));
     setLoads(<Row><Col><Skeleton width="280px" height='200px' theme="image" /><br/><Skeleton width="100px" theme="text" /><br/><Skeleton width="250px" theme="text" /><br/><Skeleton width="250px" theme="text" /></Col><Col><Skeleton width="280px" height='200px' theme="image" /><br/><Skeleton width="100px" theme="text" /><br/><Skeleton width="250px" theme="text" /><br/><Skeleton width="250px" theme="text" /></Col><Col><Skeleton width="280px" height='200px' theme="image" /><br/><Skeleton width="100px" theme="text" /><br/><Skeleton width="250px" theme="text" /><br/><Skeleton width="250px" theme="text" /></Col><Col><Skeleton width="280px" height='200px' theme="image" /><br/><Skeleton width="100px" theme="text" /><br/><Skeleton width="250px" theme="text" /><br/><Skeleton width="250px" theme="text" /></Col> </Row>);
     const timer = setTimeout(() => {
     //  loadNFTs();
      // setLoads("");
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
   
   const it = ['0x9d1bad4c173785cdd66744d3dc60bed62e325284','0x55A35DCBdBa3049F3cB2f24f48a3791950F8DF73','0xdc7f552706774cb868E9C3d270B04b560B033C43','0x57e9f4feD17a7A48a1e77ab3ed0D6908ACe4e163','0xCe7a747D529caa125DC83AC4227c0D2Da1C76E89'];

  // console.log(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
   const leaves = it.map(x => keccak256(x));
   //console.log(leaves);
   const tree = new MerkleTree(leaves, keccak256,  { sortPairs: true })
   const buf2hex = x => '0x' + x.toString('hex')
   const getroot = buf2hex(tree.getRoot());
   console.log(getroot)
  
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

 
   //   const querySnapshot = await getDocs(postsCollectionRef);
//querySnapshot.forEach((doc) => {
  // doc.data() is never undefined for query doc snapshots
  //console.log(doc.data().address);
//});
    
   
  const it = ['0x9d1bad4c173785cdd66744d3dc60bed62e325284','0x55A35DCBdBa3049F3cB2f24f48a3791950F8DF73','0xdc7f552706774cb868E9C3d270B04b560B033C43','0x57e9f4feD17a7A48a1e77ab3ed0D6908ACe4e163','0xCe7a747D529caa125DC83AC4227c0D2Da1C76E89','0xEc2Df8E979FB45C9Df814713E4A6bb1f55847d12','0xF60e8D24fA9875649E8386A8d6ce0e2AA63A4E99','0xf3E5ef0bc7537A2e2774890b5cE432048c603eA2'];
//const it = doc.data().address;
console.log(it);
  const leaves = it.map(x => keccak256(x));

  

  
  console.log(leaves);
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
          id: level,
          amount: 1,
          proof: proof
        
      },


    
     
    };

    const minted = await Moralis.executeFunction(minting);



  

   
 const receipt =   await minted.wait(1);
   
 setSuccess(<Alert variant="success">
    <Alert.Heading>Success</Alert.Heading>
    <p>
      Successfully minted
    </p>
    
    </Alert>);
         
    
    }
    catch(err)
    {
      console.log(err.error.message);
      setSpin(<Button  type="submit" style={{padding:'20px',backgroundColor:'#2FAC66',width:'100%'}} variant="success"><span style={{color:'black',fontSize:'23px'}} className="democ" >Mint</span>
</Button>);
setSuccess(<Alert variant="danger">
<Alert.Heading>Error</Alert.Heading>
<p>
  Something went Wrong  {err.error.message}
</p>

</Alert>);
     
    /* if(err)
     {
   setSuccess(<Alert variant="danger">
    <Alert.Heading>Error</Alert.Heading>
    <p>
      Something went Wrong {err}
    </p>
    
    </Alert>);
     }
     else
     {
      console.log("exited");
     }*/
  // else
   //{
    
   //}


    
   
    }

    setSpin(<Button  type="submit" style={{padding:'20px',backgroundColor:'#2FAC66',width:'100%'}} variant="success"><span style={{color:'black',fontSize:'23px'}} className="democ" >Mint</span>
    </Button>);


    
  }

  function handleChange(e) {
    setLevel(e.target.value);
    console.log(level);
  }

    return(
        
        <section>



            <Container>
            <br/><br/>
        <h2 align="center">My NFTS</h2>
        <br/><br/>
        <form onSubmit={mintNfts}>
        <h3>Mint an NFT</h3>
        <h4>Select Pass Type</h4>
        <Form.Select onChange={(e) => handleChange(e)}>
    <option>1</option>
    <option>2</option>
    <option>3</option>
    <option>4</option>
    <option>5</option>
  </Form.Select>

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