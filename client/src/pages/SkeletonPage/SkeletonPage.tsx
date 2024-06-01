import React from 'react';
import './SkeletonPage.css';
import { useScrollToTopOnLoad } from '../../components/Utility/ScrollUtility';

const SkeletonPage: React.FC = () => {
    useScrollToTopOnLoad();

    return (
        <main className="skeleton-page">
            <div className="skeleton-component skeleton-page__header w-full"></div>
            <div className="flex flex-row mt-10 w-full justify-around">
                <div className="skeleton-component skeleton-page__content"></div>
                <div className="skeleton-component skeleton-page__content--2"></div>
            </div>
        </main>
    );
};

export default SkeletonPage;
