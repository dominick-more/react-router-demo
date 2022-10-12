import React ,{ FC, useMemo } from 'react';
import { Outlet, Route, Routes } from 'react-router-dom';
import About, { AboutProps } from '../layout/About';
import MainLayout, { MainLayoutLinkProps, MainLayoutProps } from '../layout/MainLayout';
import NotFound from '../layout/NotFound';
import './Main.css';

enum PictureRoutes {
    'About' = 'about',
    'List' = 'list'
}

const pictureInfos: Readonly<Record<string, string>> = Object.freeze({
    '01': 'All seeing eye',
    '02': 'Michael the Archangel',
    '03': 'Victorian Thouroughbred',
    '04': 'The sea',
    '05': 'Helen of Troy',
    '06': 'Abstract metalwork',
});

// style={{height: '100%', width: '100%'}}


const PictureList: FC = () => {
    const pictures = useMemo((): JSX.Element[] => {
        return Object.entries(pictureInfos).map((entry) => {
            const src = `/images/pic_${entry[0]}.jpg`;
            return (
                <div className='image-item' key={entry[0]}>
                    <img alt={entry[1]}src={src}/>
                    <span>{entry[1]}</span>
                </div>
            );
        });
    }, []);
    
    return (
        <div className='picture-list'>
            <span>Here are the pictures</span>
            <div>{pictures}</div>
        </div>
    );
}

const PicturesMain: FC<MainLayoutProps> = (props) => {
    const {linkProps} = props;
    return (
      <MainLayout linkProps={linkProps}>
        <Outlet/>
      </MainLayout>
    );
  };
  
  function Pictures() {
    const aboutProps = useMemo((): AboutProps => {
        return {
            title: 'About pictures',
            contentList: ['Here\'s a few lines to demonstrate the use of the about component.',
            'We are using this component to render some useful information about pictures.']
        }
    }, []);
    
    const linkProps = useMemo((): MainLayoutLinkProps[] => {
        return [
            {to: PictureRoutes.List, linkText: 'Picture List'},
            {to: PictureRoutes.About, linkText: 'About'},
        ];
    }, []);
    return (
        <Routes>
            <Route path='/' element={<PicturesMain linkProps={linkProps}/>}>
                <Route path={`${PictureRoutes.List}`} element={<PictureList/>}/>
                <Route path={`${PictureRoutes.About}`} element={<About {...aboutProps}/>}/>
                <Route index element={<PictureList/>}/>
                <Route path='*' element={<NotFound/>}/>
            </Route>
        </Routes>
    );
  }

  
export default Pictures;