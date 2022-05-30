import { useState, useEffect } from 'react';
import { useTheme} from '@mui/material/styles';
import {
  Card,
  Stack,
  Button,
  Container,
  Typography,
} from '@mui/material';
import { Element, animateScroll as scroll, scroller, Events } from 'react-scroll'
import DiffFile from './DiffFile';
import { ScrollSync, ScrollSyncPane } from '../scroll-sync'; // react-scroll-sync';
import { hashFileHeader } from '../../utils/diffRefs'

export default function DiffView(props) {

    const [state, setState] = useState({synchronised:true, scrollPromise:null});

    useEffect(() => {
        if (state.scrollPromise !== null) {
            state.scrollPromise.then(() => setState({synchronised:true,scrollPromise:null}))
        }
    }, [state]);
    
    const scrollAndResync = (scrollfunc) => {
        const scrollPromise = new Promise((resolve, reject) => {
                Events.scrollEvent.register('end', () => {
                    resolve();
                    Events.scrollEvent.remove('end');
                });
                scrollfunc();
        });
        setState({synchronised:false,scrollPromise});
    };


    const scrollLeft = () => {
    
        scroller.scrollTo('2cadd5c0', {
          duration: 500,
          delay: 0,
          smooth: 'easeOutQuart',
          containerId: "containerLeft"
        });
    }

    const scrollRight = () => {
         scroller.scrollTo('d054b94c', {
          duration: 500,
          delay: 0,
          smooth: 'easeOutQuart',
          containerId: "containerRight"
        });
    }
    
    const theme = useTheme()

    const scrollContainerStyle = {
        overflow: 'auto',
        height: '65vh',
        width: '100%',
        padding: theme.spacing(1),
        fontSize: "12px",
        lineHeight: "20px",
        scrollbarWidth: 'thin'
    }

    const debug = (
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
            <Button
                variant="contained"
                onClick={() => scrollAndResync(scrollLeft)}>
                Scroll Left
            </Button>
            <Button
                onClick={() => setState({synchronised:true,scrollPromise:state.scrollPromise})}
                variant="contained">
                sync
            </Button>
            <Button
                onClick={() => setState({synchronised:false,scrollPromise:state.scrollPromise})}
                variant="contained">
                unsync
            </Button>
            <Button
                variant="contained"
                onClick={() => scrollAndResync(scrollRight)}>
                Scroll Right
            </Button>
        </Stack>)

    const body = (
        <ScrollSync enabled={state.synchronised}> 
            <Stack direction="row">
                <ScrollSyncPane>
                    <div id="containerLeft" style={{...scrollContainerStyle, direction: 'rtl'}}>
                    <div style={{direction: 'ltr'}}>
                        {props.files.map(file => {
                            const id = hashFileHeader(true, file.oldPath, file.oldRevision)
                            return <DiffFile file={file} left={true} key={id} id={id}/>
                        })}
                    </div>
                    </div>
                </ScrollSyncPane>
                <ScrollSyncPane>
                    <div id="containerRight" style={scrollContainerStyle}>
                        {props.files.map(file => {
                            const id = hashFileHeader(true, file.newPath, file.newRevision)
                            return <DiffFile file={file} key={id} id={id}/>
                        })}
                    </div>
                </ScrollSyncPane>
            </Stack>
        </ScrollSync>) 


    return props.debug ? <>{debug} {body}</> : body
};
