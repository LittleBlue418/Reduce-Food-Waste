## CODE WRITTEN WITH HELP FROM A FRIEND

## Build frontend
FROM docker.io/library/node:12 AS frontend_builder
WORKDIR /builddir
COPY frontend/package.json /builddir/
COPY frontend/package-lock.json /builddir/
RUN npm install

COPY frontend/ /builddir/
RUN npm run build


## Build backend
FROM python:3.6 AS backend_builder
RUN pip install virtualenv
RUN virtualenv /srv/backend
WORKDIR /builddir
COPY backend/ /builddir/
RUN /srv/backend/bin/pip install .


## Reduce Foodwaste image
FROM python:3.6 AS reduce_foodwaste
RUN pip install uwsgi
ENV FLASK_APP=reduce_foodwaste:app
WORKDIR /srv/
COPY --from=frontend_builder /builddir/build/ /srv/frontend
COPY --from=backend_builder /srv/backend/ /srv/backend/
COPY uwsgi.ini /srv/

CMD ["/usr/local/bin/uwsgi", "--ini", "/srv/uwsgi.ini"]