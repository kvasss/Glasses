import create from "zustand";
import useStore from "./appStore";

const defaultParams = {
  rotationX: 0,
  offsetY: 0,
  offsetZ: 0,
  templesY: 0,
  scale: 0.6
};

const LoadSettings = async (set, get) => {
  const basePathToModel = useStore((state) => state.basePathToModel);
  const currentModel = useStore((state) => state.currentModel);
  const pathToModel = basePathToModel + "/" + currentModel + "/";
  fetch(pathToModel + "config.json")
    .then((response) => response.json())
    .then((json) => {
      set({
        envPreset: json.envPreset ? json.envPreset : "city",
        params: json.params ? json.params : defaultParams,
        lensesSettings: json.lensesSettings ? json.lensesSettings : {},
        refractiveSettings: json.refractiveSettings
          ? json.refractiveSettings
          : {},
        opaqueSettings: json.opaqueSettings ? json.opaqueSettings : {}
      });
      console.log(json);
    })
    .catch((error) => {
      console.log(error);
    });
};

const modelStore = create((set, get) => {
  return {
    envPreset: "city",
    params: {
      rotationX: 0,
      offsetY: 0,
      offsetZ: 0,
      templesY: 0,
      scale: 0.6
    },
    lensesSettings: {},
    refractiveSettings: {},
    opaqueSettings: {},
    meshes: {},
    loadSettings: async () => {
      await LoadSettings(set, get);
    },
    setParams: (params) => {
      set((state) => ({
        params: () => params
      }));
    },
    resetParams: () => {
      set((state) => ({
        params: () => defaultParams
      }));
    }
  };
});

export default modelStore;
