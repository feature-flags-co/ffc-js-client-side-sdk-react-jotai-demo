import ffcClient from "ffc-js-client-side-sdk";
import { IFeatureFlag, IOption, IVariationOption } from "ffc-js-client-side-sdk/esm/types";
import { useAtom } from "jotai";
import { useEffect } from "react";
import { ffcFlagsAtom } from "./atoms";
import { flagsDefaultValues, option } from "./config";
import { createFlagsProxy } from "./utils";

export const useInitFFC = () => {
    const [_, setFfcFlags] = useAtom(ffcFlagsAtom);

    const _option: IOption = Object.assign(
        { 
          anonymous: true, 
          enableDataSync: true,
          bootstrap: Object.keys(flagsDefaultValues).map(k => ({
            id: k,
            variation: flagsDefaultValues[k],
            variationOptions: [] as IVariationOption[]
          })) as IFeatureFlag[]
        }, 
        option || {}
      );
      
    useEffect(() => {
      ffcClient.init(_option);
    
      ffcClient.on("ff_update", (changes: any[]) => {
        if (changes.length) {
          setFfcFlags(createFlagsProxy());
        }
      });

      ffcClient.waitUntilReady().then((data: any[]) => {
        if (data.length) {
            setFfcFlags(createFlagsProxy());
          }
      });
    }, []);
  };