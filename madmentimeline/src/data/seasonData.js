const seasons = [
      { 
      name: 'Season 1', 
      start: '1960-03-01', 
      end: '1960-11-30', 
      color: '#8B4513', 
      episodes: [
        { 
          number: 1, 
          title: 'Smoke Gets in Your Eyes', 
          dates: [
            { start: '3-17-1960', end: '3-18-1960', type: 'range', confidence: 'known' }
          ]
        },
        { 
          number: 2, 
          title: 'Ladies Room', 
          dates: [
            { start: '3-26-1960', end: '3-29-1960', type: 'range', confidence: 'estimate' }
          ]
        },
        { 
          number: 3, 
          title: 'Marriage of Figaro', 
          dates: [
            { start: '4-8-1960', end: '4-9-1960', type: 'range', confidence: 'known' }
          ]
        },
        { 
          number: 4, 
          title: 'New Amsterdam', 
          dates: [
            { start: '4-11-1960', end: '4-13-1960', type: 'range', confidence: 'estimate' }
          ]
        },
        { 
          number: 5, 
          title: '5G', 
          dates: [
            { start: '4-18-1960', end: '4-21-1960', type: 'range', confidence: 'estimate' }
          ]
        },
        { 
          number: 6, 
          title: 'Babylon', 
          dates: [
            { date: '5-8-1960', type: 'exact', confidence: 'known' },
            { start: '5-16-1960', end: '5-18-1960', type: 'range', confidence: 'estimate' }
          ]
        },
        { 
          number: 7, 
          title: 'Red in the Face', 
          dates: [
            { start: '5-30-1960', end: '6-3-1960', type: 'range', confidence: 'estimate' }
          ]
        },
        { 
          number: 8, 
          title: 'The Hobo Code', 
          dates: [
            { start: '7-15-1960', end: '7-22-1960', type: 'range', confidence: 'estimate' }
          ]
        },
        { 
          number: 9, 
          title: 'Shoot', 
          dates: [
            { start: '8-15-1960', end: '8-22-1960', type: 'range', confidence: 'estimate' }
          ]
        },
        { 
          number: 10, 
          title: 'Long Weekend', 
          dates: [
            { date: '9-2-1960', type: 'exact', confidence: 'known' }
          ]
        },
        { 
          number: 11, 
          title: 'Indian Summer', 
          dates: [
            { start: '10-11-1960', end: '10-14-1960', type: 'range', confidence: 'estimate' }
          ]
        },
        { 
          number: 12, 
          title: 'Nixon vs. Kennedy', 
          dates: [
            { start: '11-8-1960', end: '11-9-1960', type: 'range', confidence: 'known' }
          ]
        },
        { 
          number: 13, 
          title: 'The Wheel', 
          dates: [
            { start: '11-20-1960', end: '11-23-1960', type: 'range', confidence: 'known' }
          ]
        }
      ]
    },
    { 
      name: 'Season 2', 
      start: '1962-02-01', 
      end: '1962-10-31', 
      color: '#A0522D', 
      episodes: [
        { 
          number: 1, 
          title: 'For Those Who Think Young', 
          dates: [
            { date: '7-27-1962', type: 'exact', confidence: 'estimate' }
          ]
        },
        { 
          number: 2, 
          title: 'Flight 1', 
          dates: [
            { date: '8-3-1962', type: 'exact', confidence: 'estimate' }
          ]
        },
        { 
          number: 3, 
          title: 'The Benefactor', 
          dates: [
            { date: '8-10-1962', type: 'exact', confidence: 'estimate' }
          ]
        },
        { 
          number: 4, 
          title: 'Three Sundays', 
          dates: [
            { date: '8-17-1962', type: 'exact', confidence: 'estimate' }
          ]
        },
        { 
          number: 5, 
          title: 'The New Girl', 
          dates: [
            { date: '8-24-1962', type: 'exact', confidence: 'estimate' }
          ]
        },
        { 
          number: 6, 
          title: 'Maidenform', 
          dates: [
            { date: '8-31-1962', type: 'exact', confidence: 'estimate' }
          ]
        },
        { 
          number: 7, 
          title: 'The Gold Violin', 
          dates: [
            { date: '9-7-1962', type: 'exact', confidence: 'estimate' }
          ]
        },
        { 
          number: 8, 
          title: 'A Night to Remember', 
          dates: [
            { date: '9-14-1962', type: 'exact', confidence: 'estimate' }
          ]
        },
        { 
          number: 9, 
          title: 'Six Month Leave', 
          dates: [
            { date: '9-21-1962', type: 'exact', confidence: 'estimate' }
          ]
        },
        { 
          number: 10, 
          title: 'The Inheritance', 
          dates: [
            { date: '9-28-1962', type: 'exact', confidence: 'estimate' }
          ]
        },
        { 
          number: 11, 
          title: 'The Jet Set', 
          dates: [
            { date: '10-5-1962', type: 'exact', confidence: 'estimate' }
          ]
        },
        { 
          number: 12, 
          title: 'The Mountain King', 
          dates: [
            { date: '10-12-1962', type: 'exact', confidence: 'estimate' }
          ]
        },
        { 
          number: 13, 
          title: 'Meditations in an Emergency', 
          dates: [
            { start: '10-26-1962', end: '10-28-1962', type: 'range', confidence: 'known' }
          ]
        }
      ]
    },
    { 
      name: 'Season 3', 
      start: '1963-03-01', 
      end: '1963-12-31', 
      color: '#CD853F', 
      episodes: [
        { 
          number: 1, 
          title: 'Out of Town', 
          dates: [
            { date: '8-16-1963', type: 'exact', confidence: 'estimate' }
          ]
        },
        { 
          number: 2, 
          title: 'Love Among the Ruins', 
          dates: [
            { date: '8-23-1963', type: 'exact', confidence: 'estimate' }
          ]
        },
        { 
          number: 3, 
          title: 'My Old Kentucky Home', 
          dates: [
            { date: '8-30-1963', type: 'exact', confidence: 'estimate' }
          ]
        },
        { 
          number: 4, 
          title: 'The Arrangements', 
          dates: [
            { date: '9-6-1963', type: 'exact', confidence: 'estimate' }
          ]
        },
        { 
          number: 5, 
          title: 'The Fog', 
          dates: [
            { date: '9-13-1963', type: 'exact', confidence: 'estimate' }
          ]
        },
        { 
          number: 6, 
          title: 'Guy Walks Into an Advertising Agency', 
          dates: [
            { date: '9-20-1963', type: 'exact', confidence: 'estimate' }
          ]
        },
        { 
          number: 7, 
          title: 'Seven Twenty Three', 
          dates: [
            { date: '9-27-1963', type: 'exact', confidence: 'estimate' }
          ]
        },
        { 
          number: 8, 
          title: 'Souvenir', 
          dates: [
            { date: '10-4-1963', type: 'exact', confidence: 'estimate' }
          ]
        },
        { 
          number: 9, 
          title: 'Wee Small Hours', 
          dates: [
            { date: '10-11-1963', type: 'exact', confidence: 'estimate' }
          ]
        },
        { 
          number: 10, 
          title: 'The Color Blue', 
          dates: [
            { date: '10-18-1963', type: 'exact', confidence: 'estimate' }
          ]
        },
        { 
          number: 11, 
          title: 'The Gypsy and the Hobo', 
          dates: [
            { date: '10-25-1963', type: 'exact', confidence: 'estimate' }
          ]
        },
        { 
          number: 12, 
          title: 'The Grown Ups', 
          dates: [
            { date: '11-1-1963', type: 'exact', confidence: 'estimate' }
          ]
        },
        { 
          number: 13, 
          title: 'Shut the Door. Have a Seat.', 
          dates: [
            { date: '11-8-1963', type: 'exact', confidence: 'estimate' },
            { date: '11-22-1963', type: 'exact', confidence: 'known' }
          ]
        }
      ]
    },
    { 
      name: 'Season 4', 
      start: '1964-11-01', 
      end: '1965-10-31', 
      color: '#D2691E', 
      episodes: [
        { 
          number: 1, 
          title: 'Public Relations', 
          dates: [
            { date: '7-25-1964', type: 'exact', confidence: 'estimate' }
          ]
        },
        { 
          number: 2, 
          title: 'Christmas Comes But Once a Year', 
          dates: [
            { start: '12-24-1964', end: '12-25-1964', type: 'range', confidence: 'known' }
          ]
        },
        { 
          number: 3, 
          title: 'The Good News', 
          dates: [
            { date: '1-1-1965', type: 'exact', confidence: 'known' }
          ]
        },
        { 
          number: 4, 
          title: 'The Rejected', 
          dates: [
            { date: '2-14-1965', type: 'exact', confidence: 'known' }
          ]
        },
        { 
          number: 5, 
          title: 'The Chrysanthemum and the Sword', 
          dates: [
            { date: '3-15-1965', type: 'exact', confidence: 'estimate' }
          ]
        },
        { 
          number: 6, 
          title: 'Waldorf Stories', 
          dates: [
            { date: '4-10-1965', type: 'exact', confidence: 'estimate' }
          ]
        },
        { 
          number: 7, 
          title: 'The Suitcase', 
          dates: [
            { start: '5-22-1965', end: '5-23-1965', type: 'range', confidence: 'estimate' }
          ]
        },
        { 
          number: 8, 
          title: 'The Summer Man', 
          dates: [
            { date: '7-4-1965', type: 'exact', confidence: 'known' }
          ]
        },
        { 
          number: 9, 
          title: 'The Beautiful Girls', 
          dates: [
            { date: '8-15-1965', type: 'exact', confidence: 'estimate' }
          ]
        },
        { 
          number: 10, 
          title: 'Hands and Knees', 
          dates: [
            { date: '9-12-1965', type: 'exact', confidence: 'estimate' }
          ]
        },
        { 
          number: 11, 
          title: 'Chinese Wall', 
          dates: [
            { date: '10-3-1965', type: 'exact', confidence: 'estimate' }
          ]
        },
        { 
          number: 12, 
          title: 'Blowing Smoke', 
          dates: [
            { date: '10-10-1965', type: 'exact', confidence: 'estimate' }
          ]
        },
        { 
          number: 13, 
          title: 'Tomorrowland', 
          dates: [
            { date: '10-17-1965', type: 'exact', confidence: 'estimate' }
          ]
        }
      ]
    },
    { 
      name: 'Season 4', 
      start: '1964-11-01', 
      end: '1965-10-31', 
      color: '#D2691E', 
      episodes: [
        { 
          number: 1, 
          title: 'Public Relations', 
          dates: [
            { start: '11-20-1964', end: '12-5-1964', type: 'range', confidence: 'estimate' }
          ]
        },
        { 
          number: 2, 
          title: 'Christmas Comes But Once a Year', 
          dates: [
            { start: '12-19-1964', end: '12-24-1964', type: 'range', confidence: 'known' }
          ]
        },
        { 
          number: 3, 
          title: 'The Good News', 
          dates: [
            { start: '12-29-1964', end: '1-4-1965', type: 'range', confidence: 'known' }
          ]
        },
        { 
          number: 4, 
          title: 'The Rejected', 
          dates: [
            { start: '2-24-1965', end: '2-26-1965', type: 'range', confidence: 'known' }
          ]
        },
        { 
          number: 5, 
          title: 'The Chrysanthemum and the Sword', 
          dates: [
            { start: '3-12-1965', end: '3-23-1965', type: 'range', confidence: 'known' }
          ]
        },
        { 
          number: 6, 
          title: 'Waldorf Stories', 
          dates: [
            { start: '3-25-1965', end: '4-5-1965', type: 'range', confidence: 'estimate' }
          ]
        },
        { 
          number: 7, 
          title: 'The Suitcase', 
          dates: [
            { start: '5-25-1965', end: '5-26-1965', type: 'range', confidence: 'known' }
          ]
        },
        { 
          number: 8, 
          title: 'The Summer Man', 
          dates: [
            { start: '6-14-1965', end: '6-20-1965', type: 'range', confidence: 'known' }
          ]
        },
        { 
          number: 9, 
          title: 'The Beautiful Girls', 
          dates: [
            { start: '7-15-1965', end: '7-22-1965', type: 'range', confidence: 'estimate' }
          ]
        },
        { 
          number: 10, 
          title: 'Hands and Knees', 
          dates: [
            { start: '8-9-1965', end: '8-13-1965', type: 'range', confidence: 'known' }
          ]
        },
        { 
          number: 11, 
          title: 'Chinese Wall', 
          dates: [
            { start: '8-25-1965', end: '8-31-1965', type: 'range', confidence: 'estimate' }
          ]
        },
        { 
          number: 12, 
          title: 'Blowing Smoke', 
          dates: [
            { start: '9-1-1965', end: '9-7-1965', type: 'range', confidence: 'estimate' }
          ]
        },
        { 
          number: 13, 
          title: 'Tomorrowland', 
          dates: [
            { start: '10-8-1965', end: '10-12-1965', type: 'range', confidence: 'known' }
          ]
        }
      ]
    },
      {
      name: 'Season 5', 
      start: '1966-05-01', 
      end: '1967-04-30', 
      color: '#F4A460', 
      episodes: [
        { 
          number: 1, 
          title: 'A Little Kiss Part 1', 
          dates: [
            { start: '5-27-1966', end: '6-4-1966', type: 'range', confidence: 'known' }
          ]
        },
        { 
          number: 2, 
          title: 'A Little Kiss Part 2', 
          dates: [
            { start: '6-6-1966', end: '6-7-1966', type: 'range', confidence: 'known' }
          ]
        },
        { 
          number: 3, 
          title: 'Tea Leaves', 
          dates: [
            { start: '6-29-1966', end: '7-5-1966', type: 'range', confidence: 'known' }
          ]
        },
        { 
          number: 4, 
          title: 'Mystery Date', 
          dates: [
            { start: '7-15-1966', end: '7-16-1966', type: 'range', confidence: 'known' }
          ]
        },
        { 
          number: 5, 
          title: 'Signal 30', 
          dates: [
            { start: '7-30-1966', end: '8-8-1966', type: 'range', confidence: 'known' }
          ]
        },
        { 
          number: 6, 
          title: 'Far Away Places', 
          dates: [
            { start: '9-8-1966', end: '9-9-1966', type: 'range', confidence: 'estimate' }
          ]
        },
        { 
          number: 7, 
          title: 'At the Codfish Ball', 
          dates: [
            { start: '9-25-1966', end: '10-5-1966', type: 'range', confidence: 'estimate' }
          ]
        },
        { 
          number: 8, 
          title: 'Lady Lazarus', 
          dates: [
            { start: '10-17-1966', end: '10-20-1966', type: 'range', confidence: 'known' }
          ]
        },
        { 
          number: 9, 
          title: 'Dark Shadows', 
          dates: [
            { start: '11-11-1966', end: '11-24-1966', type: 'range', confidence: 'known' }
          ]
        },
        { 
          number: 10, 
          title: 'Christmas Waltz', 
          dates: [
            { start: '12-6-1966', end: '12-9-1966', type: 'range', confidence: 'known' }
          ]
        },
        { 
          number: 11, 
          title: 'The Other Woman', 
          dates: [
            { start: '1-16-1967', end: '1-20-1967', type: 'range', confidence: 'known' }
          ]
        },
        { 
          number: 12, 
          title: 'Commissions and Fees', 
          dates: [
            { start: '2-1-1967', end: '2-28-1967', type: 'range', confidence: 'estimate' }
          ]
        },
        { 
          number: 13, 
          title: 'The Phantom', 
          dates: [
            { start: '3-20-1967', end: '3-24-1967', type: 'range', confidence: 'known' }
          ]
        }
      ]
    },
    { 
      name: 'Season 6', 
      start: '1967-12-01', 
      end: '1968-11-30', 
      color: '#DEB887', 
      episodes: [
        { 
          number: 1, 
          title: 'The Doorway, Part One', 
          dates: [
            { start: '12-15-1967', end: '12-26-1967', type: 'range', confidence: 'known' }
          ]
        },
        { 
          number: 2, 
          title: 'The Doorway, Part Two', 
          dates: [
            { start: '12-27-1967', end: '1-1-1968', type: 'range', confidence: 'known' }
          ]
        },
        { 
          number: 3, 
          title: 'The Collaborators', 
          dates: [
            { start: '1-27-1968', end: '2-1-1968', type: 'range', confidence: 'known' }
          ]
        },
        { 
          number: 4, 
          title: 'To Have and To Hold', 
          dates: [
            { start: '3-10-1968', end: '3-17-1968', type: 'range', confidence: 'estimate' }
          ]
        },
        { 
          number: 5, 
          title: 'The Flood', 
          dates: [
            { start: '4-4-1968', end: '4-6-1968', type: 'range', confidence: 'known' }
          ]
        },
        { 
          number: 6, 
          title: 'For Immediate Release', 
          dates: [
            { start: '5-11-1968', end: '5-17-1968', type: 'range', confidence: 'known' }
          ]
        },
        { 
          number: 7, 
          title: 'Man with a Plan', 
          dates: [
            { start: '6-4-1968', end: '6-6-1968', type: 'range', confidence: 'known' }
          ]
        },
        { 
          number: 8, 
          title: 'The Crash', 
          dates: [
            { start: '6-15-1968', end: '6-22-1968', type: 'range', confidence: 'estimate' }
          ]
        },
        { 
          number: 9, 
          title: 'The Better Half', 
          dates: [
            { start: '7-1-1968', end: '7-7-1968', type: 'range', confidence: 'estimate' }
          ]
        },
        { 
          number: 10, 
          title: 'A Tale of Two Cities', 
          dates: [
            { start: '8-26-1968', end: '8-30-1968', type: 'range', confidence: 'known' }
          ]
        },
        { 
          number: 11, 
          title: 'Favors', 
          dates: [
            { start: '9-16-1968', end: '9-18-1968', type: 'range', confidence: 'estimate' }
          ]
        },
        { 
          number: 12, 
          title: 'The Quality of Mercy', 
          dates: [
            { start: '10-15-1968', end: '10-22-1968', type: 'range', confidence: 'estimate' }
          ]
        },
        { 
          number: 13, 
          title: 'In Care Of', 
          dates: [
            { start: '11-24-1968', end: '11-28-1968', type: 'range', confidence: 'known' }
          ]
        }
      ]
    },
    { 
      name: 'Season 7A', 
      start: '1969-01-01', 
      end: '1969-07-31', 
      color: '#BC8F8F', 
      episodes: [
        { 
          number: 1, 
          title: 'Time Zones', 
          dates: [
            { date: '4-13-1969', type: 'exact', confidence: 'estimate' }
          ]
        },
        { 
          number: 2, 
          title: 'A Day\'s Work', 
          dates: [
            { date: '4-20-1969', type: 'exact', confidence: 'estimate' }
          ]
        },
        { 
          number: 3, 
          title: 'Field Trip', 
          dates: [
            { date: '4-27-1969', type: 'exact', confidence: 'estimate' }
          ]
        },
        { 
          number: 4, 
          title: 'The Monolith', 
          dates: [
            { date: '5-4-1969', type: 'exact', confidence: 'estimate' }
          ]
        },
        { 
          number: 5, 
          title: 'The Runaways', 
          dates: [
            { date: '5-11-1969', type: 'exact', confidence: 'estimate' }
          ]
        },
        { 
          number: 6, 
          title: 'The Strategy', 
          dates: [
            { date: '5-18-1969', type: 'exact', confidence: 'estimate' }
          ]
        },
        { 
          number: 7, 
          title: 'Waterloo', 
          dates: [
            { start: '7-20-1969', end: '7-21-1969', type: 'range', confidence: 'known' }
          ]
        }
      ]
    },
    { 
      name: 'Season 7B', 
      start: '1970-04-01', 
      end: '1970-11-30', 
      color: '#F5DEB3', 
      episodes: [
        { 
          number: 1, 
          title: 'Severance', 
          dates: [
            { date: '4-5-1970', type: 'exact', confidence: 'estimate' }
          ]
        },
        { 
          number: 2, 
          title: 'New Business', 
          dates: [
            { date: '4-12-1970', type: 'exact', confidence: 'estimate' }
          ]
        },
        { 
          number: 3, 
          title: 'The Forecast', 
          dates: [
            { date: '4-19-1970', type: 'exact', confidence: 'estimate' }
          ]
        },
        { 
          number: 4, 
          title: 'Time & Life', 
          dates: [
            { date: '4-26-1970', type: 'exact', confidence: 'estimate' }
          ]
        },
        { 
          number: 5, 
          title: 'Lost Horizon', 
          dates: [
            { date: '5-3-1970', type: 'exact', confidence: 'estimate' }
          ]
        },
        { 
          number: 6, 
          title: 'The Milk and Honey Route', 
          dates: [
            { date: '5-10-1970', type: 'exact', confidence: 'estimate' }
          ]
        },
        { 
          number: 7, 
          title: 'Person to Person', 
          dates: [
            { start: '11-15-1970', end: '11-17-1970', type: 'range', confidence: 'estimate' }
          ]
        }
      ]
    }
  ];

  export default seasons;