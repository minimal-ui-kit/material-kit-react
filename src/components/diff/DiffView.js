import { useState } from 'react';
import {
  Card,
  Stack,
  Button,
  Container,
  Typography,
} from '@mui/material';
import { Element, animateScroll as scroll, scroller, Events } from 'react-scroll'
import { ScrollSync, ScrollSyncPane } from '../scroll-sync'; // react-scroll-sync';

export default function DiffView(props) {

    const [synchronised, setSync] = useState(true);
    
    const scrollLeft = () => {
//        scroller.scrollTo('left_id', {
//            duration: 800,
//            delay: 0,
//            smooth: 'easeInOutQuart',
//            containerId: "containerLeft"
//        });

    const scrollABit = new Promise((resolve, reject) => {

        Events.scrollEvent.register('end', () => {
            resolve();
            Events.scrollEvent.remove('end');
        });

        scroll.scrollMore(100, {
            duration: 800,
            delay: 0,
            smooth: 'easeInOutQuart',
            containerId: "containerLeft"
        });

    });

    setSync(false,() => {scrollABit.then(() => setSync(true));})

    };
    
    const scrollRight = () => {
//        scroller.scrollTo('right_id', {
//            duration: 800,
//            delay: 0,
//            smooth: 'easeInOutQuart',
//            containerId: "containerRight"
//        });
        scroll.scrollMore(100, {
            duration: 300,
            delay: 0,
            smooth: 'easeInOutQuart',
            containerId: "containerRight"
        });
    };
    
    const debug = [
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
            <Button
                variant="contained"
                onClick={scrollLeft}>
                Scroll Left
            </Button>
            <Button
                onClick={() => setSync(true)}
                variant="contained">
                sync
            </Button>
            <Button
                onClick={() => setSync(false)}
                variant="contained">
                unsync
            </Button>
            <Button
                variant="contained"
                onClick={scrollRight}>
                Scroll Right
            </Button>
        </Stack>
    ]
    const body = [
        <ScrollSync enabled={synchronised}> 
            <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
                <ScrollSyncPane>
                    <div id="containerLeft" style={{overflow: 'auto', height: '200px', direction: 'rtl'}}>
                    <div style={{direction: 'ltr'}}>
                        {props.contentLeft}
                    </div>
                    </div>
                </ScrollSyncPane>
                <div style={{width:200}} />
                <ScrollSyncPane>
                    <div id="containerRight" style={{overflow: 'auto', height: '200px'}}>
                        {props.contentRight}
                    </div>
                </ScrollSyncPane>
            </Stack>
        </ScrollSync> 
    ]

    return props.debug ? debug.concat(body) : body 
};
