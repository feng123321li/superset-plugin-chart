// SupersetPluginTableSheet.jsx
import React, { useEffect, useRef } from 'react';
import { TableSheet } from '@antv/s2';

const SupersetPluginTableSheet = ({ width, height, fields, meta, data }) => {
  const containerRef = useRef(null);
  const s2InstanceRef = useRef(null);

  useEffect(() => {
    const fetchDataAndRenderSheet = async () => {
      try {
        const s2DataConfig = {
          fields: fields,
          meta: meta,
          data,
        };

        const s2Options = {
          width: width,
          height: height,
          showSeriesNumber: true,
          // seriesNumberText: '自定义序号标题',
        };

        // Clear existing content in the container
        const container = containerRef.current;
        while (container.firstChild) {
          container.removeChild(container.firstChild);
        }

          const s2 = new TableSheet(containerRef.current, s2DataConfig, s2Options);
          s2.render();
      } catch (error) {
        console.error('Error fetching data or rendering TableSheet:', error);
      }
    };

    fetchDataAndRenderSheet();
    return () => {
      const container = containerRef.current;
      while (container.firstChild) {
        container.removeChild(container.firstChild);
      }
    };
  }, [data, fields, meta, width, height]);

  return <div ref={containerRef} />;
};

export default SupersetPluginTableSheet;
