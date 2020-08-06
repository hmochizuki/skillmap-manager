/* eslint-disable @typescript-eslint/no-empty-function */
import React from "react";
import {
  PrimaryButton,
  SecondaryButton,
} from "components/common/atoms/Buttons";
import Checkbox from "components/common/atoms/Checkbox";
import TextField from "components/common/atoms/TextField";
import Input from "components/common/atoms/Input";
import Progress from "components/common/atoms/Progress";

const App = () => (
  <div className="App">
    <PrimaryButton text="aaaaaaaaaaaaa" onClick={() => {}} />
    <SecondaryButton text="aaaaaaaaaaaaa" onClick={() => {}} />
    <Checkbox name="test" label="label" checked={false} onClick={() => {}} />
    <TextField id="id" label="aaaaaaaaaaaaaa" />
    <Input id="id" />
    <Progress />
  </div>
);

export default App;
