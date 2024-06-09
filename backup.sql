--
-- PostgreSQL database dump
--

-- Dumped from database version 16.1 (Debian 16.1-1.pgdg120+1)
-- Dumped by pg_dump version 16.1 (Debian 16.1-1.pgdg120+1)

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: note; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.note (
    id integer NOT NULL,
    title character varying NOT NULL,
    content character varying NOT NULL,
    datetime_ timestamp without time zone,
    owner_id integer NOT NULL
);


ALTER TABLE public.note OWNER TO postgres;

--
-- Name: note_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.note_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.note_id_seq OWNER TO postgres;

--
-- Name: note_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.note_id_seq OWNED BY public.note.id;


--
-- Name: period; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.period (
    id integer NOT NULL,
    title character varying NOT NULL,
    description character varying NOT NULL,
    start_time timestamp without time zone NOT NULL,
    end_time timestamp without time zone,
    topic_id integer NOT NULL,
    active_user_id integer
);


ALTER TABLE public.period OWNER TO postgres;

--
-- Name: period_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.period_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.period_id_seq OWNER TO postgres;

--
-- Name: period_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.period_id_seq OWNED BY public.period.id;


--
-- Name: subject; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.subject (
    id integer NOT NULL,
    title character varying NOT NULL,
    description character varying NOT NULL,
    owner_id integer NOT NULL
);


ALTER TABLE public.subject OWNER TO postgres;

--
-- Name: subject_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.subject_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.subject_id_seq OWNER TO postgres;

--
-- Name: subject_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.subject_id_seq OWNED BY public.subject.id;


--
-- Name: tokens; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.tokens (
    token character varying NOT NULL,
    owner_id integer NOT NULL
);


ALTER TABLE public.tokens OWNER TO postgres;

--
-- Name: topic; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.topic (
    id integer NOT NULL,
    title character varying NOT NULL,
    description character varying NOT NULL,
    total_hours double precision NOT NULL,
    owner_id integer NOT NULL,
    subject_id integer
);


ALTER TABLE public.topic OWNER TO postgres;

--
-- Name: topic_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.topic_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.topic_id_seq OWNER TO postgres;

--
-- Name: topic_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.topic_id_seq OWNED BY public.topic.id;


--
-- Name: users; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.users (
    id integer NOT NULL,
    username character varying NOT NULL,
    hashed_password character varying NOT NULL,
    first_name character varying NOT NULL,
    second_name character varying NOT NULL,
    third_name character varying NOT NULL
);


ALTER TABLE public.users OWNER TO postgres;

--
-- Name: users_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.users_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.users_id_seq OWNER TO postgres;

--
-- Name: users_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.users_id_seq OWNED BY public.users.id;


--
-- Name: note id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.note ALTER COLUMN id SET DEFAULT nextval('public.note_id_seq'::regclass);


--
-- Name: period id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.period ALTER COLUMN id SET DEFAULT nextval('public.period_id_seq'::regclass);


--
-- Name: subject id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.subject ALTER COLUMN id SET DEFAULT nextval('public.subject_id_seq'::regclass);


--
-- Name: topic id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.topic ALTER COLUMN id SET DEFAULT nextval('public.topic_id_seq'::regclass);


--
-- Name: users id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users ALTER COLUMN id SET DEFAULT nextval('public.users_id_seq'::regclass);


--
-- Data for Name: note; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.note (id, title, content, datetime_, owner_id) FROM stdin;
1	AkiraAkiraAkira	AkiraAkiraAkira	2024-06-09 11:27:14.508794	1
\.


--
-- Data for Name: period; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.period (id, title, description, start_time, end_time, topic_id, active_user_id) FROM stdin;
\.


--
-- Data for Name: subject; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.subject (id, title, description, owner_id) FROM stdin;
\.


--
-- Data for Name: tokens; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.tokens (token, owner_id) FROM stdin;
\.


--
-- Data for Name: topic; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.topic (id, title, description, total_hours, owner_id, subject_id) FROM stdin;
\.


--
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.users (id, username, hashed_password, first_name, second_name, third_name) FROM stdin;
1	Akira	$2b$12$KENNFIryzQ6r8CZRscTm8.L.Az9UAJGRpDt05S/Dq.5JBLTFPHuAK	Akira	Akira	Akira
\.


--
-- Name: note_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.note_id_seq', 1, true);


--
-- Name: period_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.period_id_seq', 1, false);


--
-- Name: subject_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.subject_id_seq', 1, false);


--
-- Name: topic_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.topic_id_seq', 1, false);


--
-- Name: users_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.users_id_seq', 1, true);


--
-- Name: topic _title_owner_unique; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.topic
    ADD CONSTRAINT _title_owner_unique UNIQUE (title, owner_id);


--
-- Name: note note_id_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.note
    ADD CONSTRAINT note_id_key UNIQUE (id);


--
-- Name: note note_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.note
    ADD CONSTRAINT note_pkey PRIMARY KEY (id, content);


--
-- Name: period period_id_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.period
    ADD CONSTRAINT period_id_key UNIQUE (id);


--
-- Name: period period_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.period
    ADD CONSTRAINT period_pkey PRIMARY KEY (id, description);


--
-- Name: subject subject_id_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.subject
    ADD CONSTRAINT subject_id_key UNIQUE (id);


--
-- Name: subject subject_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.subject
    ADD CONSTRAINT subject_pkey PRIMARY KEY (id, description);


--
-- Name: tokens tokens_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.tokens
    ADD CONSTRAINT tokens_pkey PRIMARY KEY (token);


--
-- Name: topic topic_id_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.topic
    ADD CONSTRAINT topic_id_key UNIQUE (id);


--
-- Name: topic topic_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.topic
    ADD CONSTRAINT topic_pkey PRIMARY KEY (id, description);


--
-- Name: users users_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (id);


--
-- Name: users users_username_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_username_key UNIQUE (username);


--
-- Name: ix_note_title; Type: INDEX; Schema: public; Owner: postgres
--

CREATE UNIQUE INDEX ix_note_title ON public.note USING btree (title);


--
-- Name: ix_period_title; Type: INDEX; Schema: public; Owner: postgres
--

CREATE UNIQUE INDEX ix_period_title ON public.period USING btree (title);


--
-- Name: ix_subject_title; Type: INDEX; Schema: public; Owner: postgres
--

CREATE UNIQUE INDEX ix_subject_title ON public.subject USING btree (title);


--
-- Name: ix_tokens_token; Type: INDEX; Schema: public; Owner: postgres
--

CREATE UNIQUE INDEX ix_tokens_token ON public.tokens USING btree (token);


--
-- Name: ix_topic_title; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX ix_topic_title ON public.topic USING btree (title);


--
-- Name: note note_owner_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.note
    ADD CONSTRAINT note_owner_id_fkey FOREIGN KEY (owner_id) REFERENCES public.users(id);


--
-- Name: period period_active_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.period
    ADD CONSTRAINT period_active_user_id_fkey FOREIGN KEY (active_user_id) REFERENCES public.users(id);


--
-- Name: period period_topic_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.period
    ADD CONSTRAINT period_topic_id_fkey FOREIGN KEY (topic_id) REFERENCES public.topic(id);


--
-- Name: subject subject_owner_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.subject
    ADD CONSTRAINT subject_owner_id_fkey FOREIGN KEY (owner_id) REFERENCES public.users(id);


--
-- Name: tokens tokens_owner_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.tokens
    ADD CONSTRAINT tokens_owner_id_fkey FOREIGN KEY (owner_id) REFERENCES public.users(id);


--
-- Name: topic topic_owner_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.topic
    ADD CONSTRAINT topic_owner_id_fkey FOREIGN KEY (owner_id) REFERENCES public.users(id);


--
-- Name: topic topic_subject_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.topic
    ADD CONSTRAINT topic_subject_id_fkey FOREIGN KEY (subject_id) REFERENCES public.subject(id);


--
-- PostgreSQL database dump complete
--

