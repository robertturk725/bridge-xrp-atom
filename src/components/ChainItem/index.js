import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Box, Image, Typography } from "@material-ui/core";
import { IoWalletOutline } from "react-icons/io5";
import { useCosmosWallet } from "@use-web3wallet/cosmos";
import { useSignIn } from "xumm-react";
import { Wrapper, IconImage, FlexBox, RightBox } from "./styles.module";
import { changeAtomAddress, selectAtomAddress, selectCoinList, selectDestCoinIdx, selectStartCoinIdx } from '../../redux/bridge';
import CoinSelect from "../CoinSelect"
import InputAmount from "../InputAmount";
import ButtonPrimary from "../Shared/Button/ButtonPrimary";
import effect from "../../assets/images/effect.png";
import { formatAddress } from "../../utils/functions";

const ChainItem = (props) => {
  const {
    coinIdx,
    label,
    handleChangeCoin,
    amount,
    handleChangeAmount,
    handleConnect,
    readOnly,
  } = props;

  const coinList = useSelector(selectCoinList);
  const [atomAddress, setAtomAddress] = useState(localStorage.getItem("atomAddress"));
  const [xrpAddress, setXrpAddress] = useState(localStorage.getItem("xrpAddress"));

  const { signIn, signInData: { xummPayload } = {} } = useSignIn();
  const qr = xummPayload?.refs?.qr_png;

  const {
    connectTo,
    disconnect,
    isLoading,
    isWalletConnected,
    currentWallet,
    provider,
    chainInfos
  } = useCosmosWallet();

  const connectAtomWallet = () => {
    if (isWalletConnected) {
      localStorage.removeItem("atomAddress");
      setAtomAddress("");
      disconnect();
    }
    else {
      connectTo("Keplr");
    }
  }

  const connectXrpWallet = () => {
    // localStorage.removeItem("xrpAddress");
    // setXrpAddress("");
    // disconnect();
  }

  useEffect(() => {
    if (chainInfos) {
      const addr = chainInfos['cosmoshub-4']?.accounts[0]?.address;
      if (addr) {
        localStorage.setItem("atomAddress", addr);
        setAtomAddress(addr);
        handleConnect(addr);
      }
    }
  }, [chainInfos]);


  return (
    <Wrapper>
      <FlexBox>
        <Box className="relative w-[144px] h-[144px] mr-[35px]">
          <IconImage src={coinList[coinIdx].image} alt="chain-logo" />
          <img
            className="absolute object-fill w-[200%] -left-[25px] -bottom-[27px] max-w-none"
            src={effect} alt="effect" />
        </Box>
        <RightBox>
          <FlexBox className="justify-between">
            <CoinSelect width={200} coinIdx={coinIdx} label={label} noIcon={true} handleChangeCoin={handleChangeCoin} />
            {coinIdx === 1 ?
              <ButtonPrimary
                sizeClass={`px-4 sm:px-5 ${atomAddress && `bg-transparent border border-[#33FF00] text-[#33FF00] hover:text-black`}`}
                onClick={connectAtomWallet}
              >
                <IoWalletOutline size={22} />
                <span className="pl-2">
                  {
                    atomAddress ?
                      <>
                        <div>disconnect</div>
                        <div>{formatAddress(atomAddress)}</div>
                      </>
                      :
                      "Connect Wallet"
                  }
                </span>
              </ButtonPrimary>
              :
              qr ? (
                <img src={qr} css={{ width: 200, height: 200 }} alt="xumm-qr" />
              ) : (
                <ButtonPrimary
                  sizeClass={`px-4 sm:px-5 ${qr && `bg-transparent border border-[#33FF00] text-[#33FF00] hover:text-black`}`}
                  onClick={signIn}
                >
                  <IoWalletOutline size={22} />
                  <span className="pl-2">
                    {
                      // qr ?
                      //   <>
                      //     <div>disconnect</div>
                      //     <div>{formatAddress(xrpAddress)}</div>
                      //   </>
                      //   :
                        "Connect Wallet"
                    }
                  </span>
                </ButtonPrimary>
              )
            }
          </FlexBox>
          <InputAmount
            amount={amount}
            coinIdx={coinIdx}
            handleChangeCoin={handleChangeCoin}
            handleChangeAmount={handleChangeAmount}
            readOnly={readOnly}
          />
        </RightBox>
      </FlexBox>

    </Wrapper>
  )
}

export default ChainItem;