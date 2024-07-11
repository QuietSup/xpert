FROM ubuntu:jammy

RUN apt-get update && \
  apt-get install --no-install-recommends -y python3 && \
  apt-get install --no-install-recommends -y python3-pip && \
  apt-get install --no-install-recommends -y python3-venv && \
  apt-get clean

WORKDIR /app

COPY requirements.txt .

RUN pip install --no-cache-dir -r requirements.txt

COPY . .

CMD [ "python3", "-u", "src/index.py" ]
