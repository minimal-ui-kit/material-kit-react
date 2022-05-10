import { useState, useEffect } from 'react';
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

export default function DiffView(props) {

    const [state, setState] = useState({synchronised:true, scrollPromise:null});

    useEffect(() => {
        console.log(state)
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
        scroll.scrollMore(100, {
            duration: 300,
            delay: 0,
            smooth: 'easeOutQuart',
            containerId: "containerLeft"
        });
    }

    const scrollRight = () => {
        scroll.scrollMore(100, {
            duration: 300,
            delay: 0,
            smooth: 'easeOutQuart',
            containerId: "containerRight"
        });
    }

    const debug = [
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
        </Stack>
    ]
    const body = [
        <ScrollSync enabled={state.synchronised}> 
            <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
                <ScrollSyncPane>
                    <div id="containerLeft" style={{overflow: 'auto', height: '400px', width: '100%', direction: 'rtl'}}>
                    <div style={{direction: 'ltr'}}>
                        {props.files.map(file => <DiffFile file={file} left={true}/>)}
                    </div>
                    </div>
                </ScrollSyncPane>
                <div style={{width:200}} />
                <ScrollSyncPane>
                    <div id="containerRight" style={{overflow: 'auto', height: '400px', width: '100%',}}>
                        {props.files.map(file => <DiffFile file={file} left={false}/>)}
                    </div>
                </ScrollSyncPane>
            </Stack>
        </ScrollSync> 
    ]

    return props.debug ? debug.concat(body) : body 
};
