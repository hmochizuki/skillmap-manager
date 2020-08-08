import React, { memo, useCallback } from "react";
import Card from "components/common/molecules/Card";
import IconButton from "components/common/atoms/IconButton";
import { useHistory } from "react-router";
import { PrimaryButton } from "components/common/atoms/Buttons";
import { Link } from "react-router-dom";

type Props = {
  header: {
    title: string;
    subTitle?: string;
  };
  navigateTo: string;
  media: {
    title: string;
    path: string;
  };
  contents: string;
};

const NavCard: React.FC<Props> = ({ header, navigateTo, media, contents }) => {
  const history = useHistory();
  const navigate = useCallback(() => history.push(navigateTo), [
    navigateTo,
    history,
  ]);

  const headers = {
    ...header,
    rightIcon: (
      <Link to={navigateTo}>
        <IconButton
          label="navigation to edit skillmap"
          iconName="navigation"
          size="large"
          onClick={navigate}
        />
      </Link>
    ),
  };

  const footer = {
    right: <PrimaryButton text="はじめる" onClick={navigate} />,
  };

  return (
    <Card
      header={headers}
      media={media}
      contents={contents}
      footerItems={footer}
    />
  );
};

export default memo(NavCard);
