import { useState } from 'react';
import {
  Card,
  Stack,
  Button,
  Container,
  Typography,
} from '@mui/material';
import { Element, animateScroll as scroll, scroller } from 'react-scroll'
import { ScrollSync, ScrollSyncPane } from 'react-scroll-sync';

export default function DiffView(props) {

    const [synchronised, setSync] = useState(true);
    
    const scrollLeft = () => {
//        scroller.scrollTo('left_id', {
//            duration: 800,
//            delay: 0,
//            smooth: 'easeInOutQuart',
//            containerId: "containerLeft"
//        });
        scroll.scrollMore(100, {
            duration: 800,
            delay: 0,
            smooth: 'easeInOutQuart',
            containerId: "containerLeft"
        });
    };
    
    const scrollRight = () => {
//        scroller.scrollTo('right_id', {
//            duration: 800,
//            delay: 0,
//            smooth: 'easeInOutQuart',
//            containerId: "containerRight"
//        });
        scroll.scrollMore(100, {
            duration: 800,
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
                variant="contained"
                onClick={scrollRight}>
                Scroll Right
            </Button>
        </Stack>
    ]
    const body = [
        <ScrollSync enabled={true}> 
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
