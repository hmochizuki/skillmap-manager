const workSheet = "/worksheet";
const skillmap = "/skillmap";

const routeNames = {
  home: "/",
  workSheet,
  workSheetManage: `${workSheet}/manage`,
  workSheetAnswer: `${workSheet}/answer`,
  skillmap,
  privateMap: `${skillmap}/private`,
  teamMap: `${skillmap}/team`,
  signin: "/signin",
};

export default routeNames;
