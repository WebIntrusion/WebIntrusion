import os
from subprocess import PIPE, Popen
from threading import Thread
from typing import List, Dict

from fastapi import FastAPI
from pydantic import BaseModel

from const import WORDLISTS_BASE_URL


class DirbProcess(BaseModel):
    pid: int
    url: str
    wordlist: str
    stdout: str


running_procs: Dict[int, DirbProcess] = {}

app = FastAPI()


def enqueue_output(stdout, pid):
    global running_procs
    for line in iter(stdout.readline, b''):
        running_procs[pid].stdout += line.decode()
    del running_procs[pid]
    stdout.close()


@app.post("/dirb")
async def create_dirb_process(url: str, wordlist: str) -> DirbProcess:
    cmd = ['dirb', url, os.path.join(WORDLISTS_BASE_URL, wordlist)]

    new_process = Popen(cmd, stdout=PIPE, stderr=PIPE)

    process_thread = Thread(target=enqueue_output, args=(
        new_process.stdout, new_process.pid))
    process_thread.daemon = True
    process_thread.start()

    dirb_proc = DirbProcess(pid=new_process.pid, url=url,
                            wordlist=wordlist, stdout='')

    running_procs[new_process.pid] = dirb_proc

    return dirb_proc


@app.get("/dirb/stdout")
async def get_stdout(pid: int) -> str:
    return running_procs[pid].stdout


@app.get("/dirb/scan")
async def get_scan(pid: int) -> List[str]:
    return ['test url']


@app.get("/dirb/wordlists")
async def get_wordlists() -> List[str]:
    return [file
            for file in os.listdir(WORDLISTS_BASE_URL)
            if os.path.isfile(os.path.join(WORDLISTS_BASE_URL, file))]
