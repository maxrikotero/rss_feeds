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
    width: "50%",
  },
});

const Articles = ({ articles, readArticle }) => {
  const classes = useStyles();
  return (
    <div className={classes.wrapper}>
      <h2> Articles</h2>
      <TableContainer component={Paper}>
        <Table className={classes.table} size="small">
          <TableHead>
            <TableRow>
              <TableCell>Content</TableCell>
              <TableCell>date</TableCell>
              <TableCell>Read</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {articles.map((article) => (
              <TableRow key={article.id}>
                <TableCell component="th" scope="row">
                  <img src={article.content} style={{ height: "100px" }} />
                </TableCell>
                <TableCell component="th" scope="row">
                  {article.title}
                </TableCell>
                <TableCell component="th" scope="row">
                  {article.date}
                </TableCell>
                <TableCell component="th" scope="row">
                  <Link
                    href="#"
                    onClick={() => readArticle(article)}
                    color="body2"
                  >
                    Read
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

export default Articles;
