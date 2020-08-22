const workSheet = "/worksheet";
const skillmap = "/skillmap";

const routes = {
  home: "/",
  workSheet,
  workSheetManage: `${workSheet}/manage`,
  workSheetAnswer: `${workSheet}/answer`,
  skillmap,
  privateMap: `${skillmap}/private`,
  signin: "/signin",
};

export default routes;
