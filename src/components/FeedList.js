import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  makeStyles,
  Paper,
  Link,
} from "@material-ui/core";

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
  wrapper: {
    width: "100%",
  },
});

const FeedList = ({ feeds, getFeeds }) => {
  const classes = useStyles();
  return (
    <div className={classes.wrapper}>
      <h2> My RSS feeds</h2>
      <TableContainer component={Paper}>
        <Table className={classes.table} size="small">
          <TableHead>
            <TableRow>
              <TableCell>Title</TableCell>
              <TableCell>Url</TableCell>
              <TableCell>Read</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {feeds.map((feed) => (
              <TableRow key={feed.id}>
                <TableCell component="th" scope="row">
                  {feed.title}
                </TableCell>
                <TableCell component="th" scope="row">
                  {feed.url}
                </TableCell>
                <TableCell component="th" scope="row">
                  <Link href="#" onClick={() => getFeeds(feed)} color="body2">
                    View
                  </Link>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default FeedList;
