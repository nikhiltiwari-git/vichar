import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
  media: {
    height: 0,
    paddingTop: '8%',
    paddingBottom: '1%',
    [theme.breakpoints.down('xs')]: {
      paddingTop: '15%',
      paddingBottom: '30%'
    },
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    backgroundBlendMode: 'darken',
  },
  fullHeightCard: {
    height: '100%',
    width: '100%',
  },
  border: {
    border: 'solid',
  },
  card: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'coloumn',
    borderRadius: '12px',
    height: '98%',
    position: 'relative',
    width: '98%',
    paddingBottom: '5px',
    // marginLeft: '-5%',
    marginTop: '15px',
    marginBottom: '0px',
  },
  overlay: {
    position: 'absolute',
    top: '10px',
    left: '20px',
    color: 'white',
  },
  overlay2: {
    position: 'absolute',
    top: '20px',
    right: '20px',
    color: 'white',
  },
  overlay3: {
    position: 'relative',
    // top: '110px',
    left: '2%',
    // right: '20px',
    color: 'white',
    [theme.breakpoints.down('xs')]: {
      padding: '14px 13px 0px 7px',
    },
  },
  grid: {
    display: 'flex',
  },
  details: {
    display: 'flex',
    justifyContent: 'relative',
    padding: '2% 0.05% 0.5% 5%',
    [theme.breakpoints.down('xs')]: {
      padding: '27px 13px 0px 17px',
    },
  },
  title: {
    margin: '10px 16px',
    left: '1%',
  },
  cardActions: {
    padding: '6px 16px 8px 16px',
    display: 'flex',
    justifyContent: 'space-between',
  },
}));