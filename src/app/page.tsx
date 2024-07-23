"use client"
// pages/index.js
import React, { useEffect, useState } from 'react';
import { Container, Typography, Grid } from '@mui/material';

const teams = {
  red: ['Alice', 'Bob', 'Charlie', 'David', 'Alice', 'Bob', 'Charlie', 'David'],
  blue: ['Eve', 'Frank', 'Grace', 'Hank', 'Alice', 'Bob', 'Charlie', 'David'],
};

const Home = () => {
  const [visibleRedTeam, setVisibleRedTeam] = useState<string[]>([]);
  const [visibleBlueTeam, setVisibleBlueTeam] = useState<string[]>([]);

  const delay = 1000; // 0.3 seconds

  useEffect(() => {
    let redTeamTimeouts: NodeJS.Timeout[] = [];
    let blueTeamTimeouts: NodeJS.Timeout[] = [];

    teams.red.forEach((member, index) => {
      redTeamTimeouts.push(
        setTimeout(() => {
          setVisibleRedTeam((prev) => [...prev, member]);
        }, index * delay)
      );
    });

    teams.blue.forEach((member, index) => {
      blueTeamTimeouts.push(
        setTimeout(() => {
          setVisibleBlueTeam((prev) => [...prev, member]);
        }, index * delay)
      );
    });

    return () => {
      redTeamTimeouts.forEach(clearTimeout);
      blueTeamTimeouts.forEach(clearTimeout);
    };
  }, []);

  return (
    <Container className="p-6 mx-auto h-screen bg-cover bg-center flex items-center justify-center bg-[url('/Red-Team-vs-Blue-Team-Cyber-Security.jpg')]">
      <Grid container spacing={4} className="text-center bg-white bg-opacity-60 p-1 rounded-md m-1">
        <Grid item xs={12} sm={6}>
          <Typography variant="h4" className="text-red-500 text-5xl mb-4">Red Team</Typography>
          {visibleRedTeam.map((member, index) => (
            <Typography
              key={index}
              className="text-red-500 transition-opacity duration-1000 ease-in-out opacity-0 animate-fade-in text-3xl"
              style={{ animationDelay: `${index * 0.3}s` }}
            >
              {index + 1}. {member}
            </Typography>
          ))}
        </Grid>
        <Grid item xs={12} sm={6}>
          <Typography variant="h4" className="text-blue-500 text-5xl mb-4">Blue Team</Typography>
          {visibleBlueTeam.map((member, index) => (
            <Typography
              key={index}
              className="text-blue-500 transition-opacity duration-1000 ease-in-out opacity-0 animate-fade-in text-3xl"
              style={{ animationDelay: `${index * 0.3}s` }}
            >
              {index + 1}. {member}
            </Typography>
          ))}
        </Grid>
      </Grid>
    </Container>
  );
};

export default Home;
