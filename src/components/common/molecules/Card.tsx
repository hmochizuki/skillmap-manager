import React from "react";
import { makeStyles, createStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles(() =>
  createStyles({
    root: {
      maxWidth: 345,
    },
    media: {
      height: 0,
      paddingTop: "56.25%", // 16:9
    },
    footerRight: {
      marginLeft: "auto",
    },
  })
);

type Props = {
  header: {
    title: string;
    subTitle?: string;
    rightIcon?: JSX.Element;
    leftIcon?: JSX.Element;
  };
  media?: {
    title: string;
    path: string;
  };
  contents: string;
  footerItems?: {
    left?: JSX.Element[];
    right?: JSX.Element;
  };
};

export default function RecipeReviewCard({
  header,
  media,
  contents,
  footerItems,
}: Props) {
  const classes = useStyles();

  return (
    <Card className={classes.root}>
      <CardHeader
        title={header.title}
        subheader={header.subTitle}
        avatar={header.leftIcon}
        action={header.rightIcon}
      />
      {media && (
        <CardMedia
          className={classes.media}
          image={media.path}
          title={media.title}
        />
      )}

      <CardContent>
        <Typography variant="body2" color="textSecondary" component="p">
          {contents}
        </Typography>
      </CardContent>
      {footerItems && (
        <>
          <CardActions disableSpacing>
            {footerItems.left && footerItems.left.map((e) => e)}
            <div className={classes.footerRight}>{footerItems.right}</div>
          </CardActions>
        </>
      )}
    </Card>
  );
}
