import React from 'react';

interface CongressManSkeletonProps {
    count?: number;
}

const CongressManSkeleton: React.FC<CongressManSkeletonProps> = ({ count = 3 }) => {
    return (
        <div className="animate-pulse">
            {Array.from({ length: Math.ceil(count / 3) }, (_, rowIndex) => (
                <div key={rowIndex} className={`grid grid-cols-12 gap-4 ${rowIndex > 0 ? 'mt-8' : ''}`}>
                    {Array.from({ length: Math.min(3, count - rowIndex * 3) }, (_, colIndex) => (
                        <div key={colIndex} className="col-span-4">
                            <div className="group">
                                <div className="h-full flex flex-col">
                                    {/* Image skeleton */}
                                    <div className="flex justify-center mb-4">
                                        <div className="rounded-t-none rounded-b-full bg-gray-300 dark:bg-gray-700 shadow-2xl overflow-hidden border-t-4 border-gray-400 dark:border-gray-600">
                                            <div className="rounded-t-none rounded-b-full w-[220px] h-[220px] bg-gray-300 dark:bg-gray-700"></div>
                                        </div>
                                    </div>

                                    <div className="px-8">
                                        {/* Name skeleton */}
                                        <div className="h-6 bg-gray-300 dark:bg-gray-700 rounded mb-2"></div>
                                        <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-3/4 mx-auto mb-4"></div>

                                        {/* Line skeleton */}
                                        <div className="flex justify-center my-2">
                                            <div className="w-16 h-1 bg-gray-300 dark:bg-gray-700 rounded"></div>
                                        </div>

                                        {/* Description skeleton */}
                                        <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded mb-2"></div>
                                        <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-5/6 mx-auto mb-4"></div>

                                        {/* Social links skeleton */}
                                        <div className="flex justify-center space-x-3 mb-6">
                                            {Array.from({ length: 4 }, (_, i) => (
                                                <div key={i} className="w-5 h-5 bg-gray-300 dark:bg-gray-700 rounded"></div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            ))}
        </div>
    );
};

export default CongressManSkeleton;
