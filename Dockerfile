FROM python:3.11

RUN pip install -e .

CMD markata build