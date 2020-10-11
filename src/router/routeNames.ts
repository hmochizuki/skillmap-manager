const workSheet = "/worksheet";
const skillmap = "/skillmap";
const team = "/team";

const routeNames = {
  home: "/",
  workSheet,
  workSheetManage: `${workSheet}/manage`,
  workSheetAnswer: `${workSheet}/answer`,
  skillmap,
  privateMap: `${skillmap}/private`,
  teamMap: `${skillmap}/team`,
  signin: "/signin",
  teamSelect: `${team}/select`,
};

export default routeNames;
