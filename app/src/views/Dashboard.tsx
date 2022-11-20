import { Button, Grid, MenuItem, Select, TextField } from '@mui/material'
import { useState, useEffect } from 'react';
import { getDirbWordlists } from 'utils/api/DirbApi'

const Dashboard = () => {

    const [wordlists, setWordlists] = useState<string[]>([])

    useEffect(() => {
        getDirbWordlists()
            .then((response) => response.json())
            .then((response) => {
                setWordlists(response)
            })
    }, [])

    return (
        <>
            <Grid
                container
                justifyContent='center'
                alignItems='center'
                style={{ height: '100vh', width: '100vw' }}
            >
                <Grid item>
                    <Grid
                        container
                        justifyContent='space-between'
                        spacing={2}
                        style={{ width: '60vw' }}
                    >
                        <Grid item md={6}>
                            <TextField
                                placeholder='Select base URL to scan'
                                style={{ width: '100%' }}
                            />
                        </Grid>
                        <Grid item md={3}>
                            <Select
                                style={{ width: '100%' }}
                            >
                                {wordlists.map((wordlist, i) => {
                                    return <MenuItem value={i}>{wordlist}</MenuItem>
                                })}

                            </Select>
                        </Grid>
                        <Grid item md={3}>
                            <Button variant='contained' size='large' color='primary'
                                style={{ width: '100%', height: '100%' }}
                            >
                                Start Dirb scan
                            </Button>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </>
    );
}

export default Dashboard;
