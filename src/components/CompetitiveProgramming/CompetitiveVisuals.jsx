import React from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Text, Float, Grid, Cylinder } from '@react-three/drei';
import { Box, useTheme } from '@mui/material';
import { Line } from 'react-chartjs-2';

export const RatingGraph = ({ ratingHistory }) => {
  const theme = useTheme();

  const data = {
    labels: ratingHistory.map(r => r.date.toLocaleDateString()),
    datasets: [{
      label: 'Rating',
      data: ratingHistory.map(r => r.rating),
      borderColor: ratingHistory.map(r => r.color),
      backgroundColor: ratingHistory.map(r => r.color),
      tension: 0.4,
      pointRadius: 4,
      pointHoverRadius: 6,
      pointBackgroundColor: ratingHistory.map(r => r.color),
      pointBorderColor: theme.palette.background.paper,
      pointBorderWidth: 2,
      fill: false,
    }]
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        callbacks: {
          label: (context) => {
            const index = context.dataIndex;
            const rank = ratingHistory[index].rank;
            return `Rating: ${context.parsed.y} (${rank})`;
          }
        }
      }
    },
    scales: {
      y: {
        beginAtZero: false,
        ticks: {
          color: theme.palette.text.primary,
        },
        grid: {
          color: theme.palette.divider,
        },
      },
      x: {
        ticks: {
          color: theme.palette.text.primary,
          maxRotation: 45,
          minRotation: 45,
        },
        grid: {
          color: theme.palette.divider,
        },
      },
    },
  };

  return (
    <Box sx={{ height: 300, position: 'relative' }}>
      <Line data={data} options={options} />
    </Box>
  );
};

const ProblemBar = ({ position, height, color, label, count }) => {
  const theme = useTheme();
  return (
    <Float 
      speed={2} 
      rotationIntensity={0} 
      floatIntensity={0.2} 
      floatingRange={[0, 0.2]}
    >
      <group position={position}>
        <mesh position={[0, height/2, 0]}>
          <Cylinder args={[0.3, 0.3, height, 32]} />
          <meshStandardMaterial 
            color={color}
            transparent
            opacity={0.8}
            metalness={0.2}
            roughness={0.3}
          />
        </mesh>
        <Text
          position={[0, -0.5, 0]}
          fontSize={0.35}
          color={theme.palette.text.primary}
          anchorX="center"
          anchorY="top"
        >
          {label}
        </Text>
        <Text
          position={[0, height + 0.3, 0]}
          fontSize={0.35}
          color={theme.palette.text.primary}
          anchorX="center"
          anchorY="bottom"
        >
          {count}
        </Text>
      </group>
    </Float>
  );
};

const ProblemSolving3D = () => {
  const theme = useTheme();
  const problemCategories = [
    { category: 'DP', count: 45 },
    { category: 'Graphs', count: 30 },
    { category: 'DS', count: 40 },
    { category: 'String', count: 25 },
    { category: 'Math', count: 35 },
    { category: 'Greedy', count: 28 },
    { category: 'Trees', count: 20 },
    { category: 'Algorithms', count: 70 },
    { category: 'Bitmanipulation', count: 60 }
  ];

  const maxCount = Math.max(...problemCategories.map(c => c.count));
  const colors = [
    '#FF6B6B', '#4ECDC4', '#45B7D1',
    '#96CEB4', '#FFEEAD', '#D4A5A5'
  ];

  return (
    <Box sx={{ width: '100%', height: '300px', mb: 4 }}>
      <Canvas
        camera={{ position: [8, 12, 8], fov: 45 }}
        style={{ background: theme.palette.background.paper }}
      >
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} intensity={1} />
        <spotLight
          position={[0, 15, 0]}
          angle={0.4}
          penumbra={1}
          intensity={1}
          castShadow
        />
        <fog attach="fog" args={[theme.palette.background.paper, 10, 25]} />
        
        <group rotation={[0, Math.PI / 6, 0]}>
          {problemCategories.map((category, index) => {
            const angle = (index / problemCategories.length) * Math.PI * 2;
            const radius = 4;
            const x = Math.cos(angle) * radius;
            const z = Math.sin(angle) * radius;
            const height = (category.count / maxCount) * 3;

            return (
              <ProblemBar
                key={category.category}
                position={[x, 0, z]}
                height={height}
                color={colors[index]}
                label={category.category}
                count={category.count}
              />
            );
          })}
        </group>
        
        <Grid
          args={[20, 20]}
          position={[0, 0, 0]}
          cellSize={1}
          cellThickness={1}
          cellColor={theme.palette.divider}
          sectionSize={5}
          fadeDistance={30}
          fadeStrength={1}
          followCamera={false}
        />
        
        <OrbitControls
          enableZoom={true}
          enablePan={true}
          enableRotate={true}
          autoRotate={true}
          autoRotateSpeed={0.5}
          maxPolarAngle={Math.PI / 2}
          minPolarAngle={0}
        />
      </Canvas>
    </Box>
  );
};

export { ProblemSolving3D };
