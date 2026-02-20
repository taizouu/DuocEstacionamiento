--
-- PostgreSQL database dump
--

\restrict eFrZkk3xPbEstAK788u8dyRbAIUI3WqaRIhoN1bowwlVNlbJY9uTaYeezOXl0cX

-- Dumped from database version 18.1
-- Dumped by pg_dump version 18.1

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET transaction_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

ALTER TABLE ONLY public.mapaestacionamiento_lugar DROP CONSTRAINT mapaestacionamiento__ocupado_por_id_c02a52e1_fk_funcionar;
ALTER TABLE ONLY public.mapaestacionamiento_registromovimiento DROP CONSTRAINT mapaestacionamiento__lugar_id_0731bcbd_fk_mapaestac;
ALTER TABLE ONLY public.mapaestacionamiento_registromovimiento DROP CONSTRAINT mapaestacionamiento__liberado_por_id_0f7b4512_fk_auth_user;
ALTER TABLE ONLY public.mapaestacionamiento_registromovimiento DROP CONSTRAINT mapaestacionamiento__funcionario_id_1f7c8d8a_fk_funcionar;
ALTER TABLE ONLY public.funcionarios_funcionario DROP CONSTRAINT funcionarios_funcion_usuario_sistema_id_2c3e6919_fk_auth_user;
ALTER TABLE ONLY public.django_admin_log DROP CONSTRAINT django_admin_log_user_id_c564eba6_fk_auth_user_id;
ALTER TABLE ONLY public.django_admin_log DROP CONSTRAINT django_admin_log_content_type_id_c4bce8eb_fk_django_co;
ALTER TABLE ONLY public.auth_user_user_permissions DROP CONSTRAINT auth_user_user_permissions_user_id_a95ead1b_fk_auth_user_id;
ALTER TABLE ONLY public.auth_user_user_permissions DROP CONSTRAINT auth_user_user_permi_permission_id_1fbb5f2c_fk_auth_perm;
ALTER TABLE ONLY public.auth_user_groups DROP CONSTRAINT auth_user_groups_user_id_6a12ed8b_fk_auth_user_id;
ALTER TABLE ONLY public.auth_user_groups DROP CONSTRAINT auth_user_groups_group_id_97559544_fk_auth_group_id;
ALTER TABLE ONLY public.auth_permission DROP CONSTRAINT auth_permission_content_type_id_2f476e4b_fk_django_co;
ALTER TABLE ONLY public.auth_group_permissions DROP CONSTRAINT auth_group_permissions_group_id_b120cbf9_fk_auth_group_id;
ALTER TABLE ONLY public.auth_group_permissions DROP CONSTRAINT auth_group_permissio_permission_id_84c5c92e_fk_auth_perm;
DROP INDEX public.mapaestacionamiento_registromovimiento_lugar_id_0731bcbd;
DROP INDEX public.mapaestacionamiento_registromovimiento_liberado_por_id_0f7b4512;
DROP INDEX public.mapaestacionamiento_registromovimiento_funcionario_id_1f7c8d8a;
DROP INDEX public.mapaestacionamiento_lugar_ocupado_por_id_c02a52e1;
DROP INDEX public.mapaestacionamiento_lugar_id_lugar_d80a6694_like;
DROP INDEX public.funcionarios_funcionario_rut_ff89afaf_like;
DROP INDEX public.django_session_session_key_c0390e0f_like;
DROP INDEX public.django_session_expire_date_a5c62663;
DROP INDEX public.django_admin_log_user_id_c564eba6;
DROP INDEX public.django_admin_log_content_type_id_c4bce8eb;
DROP INDEX public.auth_user_username_6821ab7c_like;
DROP INDEX public.auth_user_user_permissions_user_id_a95ead1b;
DROP INDEX public.auth_user_user_permissions_permission_id_1fbb5f2c;
DROP INDEX public.auth_user_groups_user_id_6a12ed8b;
DROP INDEX public.auth_user_groups_group_id_97559544;
DROP INDEX public.auth_permission_content_type_id_2f476e4b;
DROP INDEX public.auth_group_permissions_permission_id_84c5c92e;
DROP INDEX public.auth_group_permissions_group_id_b120cbf9;
DROP INDEX public.auth_group_name_a6ea08ec_like;
ALTER TABLE ONLY public.mapaestacionamiento_registromovimiento DROP CONSTRAINT mapaestacionamiento_registromovimiento_pkey;
ALTER TABLE ONLY public.mapaestacionamiento_lugar DROP CONSTRAINT mapaestacionamiento_lugar_pkey;
ALTER TABLE ONLY public.mapaestacionamiento_lugar DROP CONSTRAINT mapaestacionamiento_lugar_id_lugar_key;
ALTER TABLE ONLY public.funcionarios_funcionario DROP CONSTRAINT funcionarios_funcionario_usuario_sistema_id_key;
ALTER TABLE ONLY public.funcionarios_funcionario DROP CONSTRAINT funcionarios_funcionario_rut_key;
ALTER TABLE ONLY public.funcionarios_funcionario DROP CONSTRAINT funcionarios_funcionario_pkey;
ALTER TABLE ONLY public.django_session DROP CONSTRAINT django_session_pkey;
ALTER TABLE ONLY public.django_migrations DROP CONSTRAINT django_migrations_pkey;
ALTER TABLE ONLY public.django_content_type DROP CONSTRAINT django_content_type_pkey;
ALTER TABLE ONLY public.django_content_type DROP CONSTRAINT django_content_type_app_label_model_76bd3d3b_uniq;
ALTER TABLE ONLY public.django_admin_log DROP CONSTRAINT django_admin_log_pkey;
ALTER TABLE ONLY public.auth_user DROP CONSTRAINT auth_user_username_key;
ALTER TABLE ONLY public.auth_user_user_permissions DROP CONSTRAINT auth_user_user_permissions_user_id_permission_id_14a6b632_uniq;
ALTER TABLE ONLY public.auth_user_user_permissions DROP CONSTRAINT auth_user_user_permissions_pkey;
ALTER TABLE ONLY public.auth_user DROP CONSTRAINT auth_user_pkey;
ALTER TABLE ONLY public.auth_user_groups DROP CONSTRAINT auth_user_groups_user_id_group_id_94350c0c_uniq;
ALTER TABLE ONLY public.auth_user_groups DROP CONSTRAINT auth_user_groups_pkey;
ALTER TABLE ONLY public.auth_permission DROP CONSTRAINT auth_permission_pkey;
ALTER TABLE ONLY public.auth_permission DROP CONSTRAINT auth_permission_content_type_id_codename_01ab375a_uniq;
ALTER TABLE ONLY public.auth_group DROP CONSTRAINT auth_group_pkey;
ALTER TABLE ONLY public.auth_group_permissions DROP CONSTRAINT auth_group_permissions_pkey;
ALTER TABLE ONLY public.auth_group_permissions DROP CONSTRAINT auth_group_permissions_group_id_permission_id_0cd325b0_uniq;
ALTER TABLE ONLY public.auth_group DROP CONSTRAINT auth_group_name_key;
ALTER TABLE ONLY public.administracion_configuracionsistema DROP CONSTRAINT administracion_configuracionsistema_pkey;
DROP TABLE public.mapaestacionamiento_registromovimiento;
DROP TABLE public.mapaestacionamiento_lugar;
DROP TABLE public.funcionarios_funcionario;
DROP TABLE public.django_session;
DROP TABLE public.django_migrations;
DROP TABLE public.django_content_type;
DROP TABLE public.django_admin_log;
DROP TABLE public.auth_user_user_permissions;
DROP TABLE public.auth_user_groups;
DROP TABLE public.auth_user;
DROP TABLE public.auth_permission;
DROP TABLE public.auth_group_permissions;
DROP TABLE public.auth_group;
DROP TABLE public.administracion_configuracionsistema;
SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: administracion_configuracionsistema; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.administracion_configuracionsistema (
    id bigint NOT NULL,
    clave_maestra character varying(50) NOT NULL
);


ALTER TABLE public.administracion_configuracionsistema OWNER TO postgres;

--
-- Name: administracion_configuracionsistema_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

ALTER TABLE public.administracion_configuracionsistema ALTER COLUMN id ADD GENERATED BY DEFAULT AS IDENTITY (
    SEQUENCE NAME public.administracion_configuracionsistema_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- Name: auth_group; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.auth_group (
    id integer NOT NULL,
    name character varying(150) NOT NULL
);


ALTER TABLE public.auth_group OWNER TO postgres;

--
-- Name: auth_group_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

ALTER TABLE public.auth_group ALTER COLUMN id ADD GENERATED BY DEFAULT AS IDENTITY (
    SEQUENCE NAME public.auth_group_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- Name: auth_group_permissions; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.auth_group_permissions (
    id bigint NOT NULL,
    group_id integer NOT NULL,
    permission_id integer NOT NULL
);


ALTER TABLE public.auth_group_permissions OWNER TO postgres;

--
-- Name: auth_group_permissions_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

ALTER TABLE public.auth_group_permissions ALTER COLUMN id ADD GENERATED BY DEFAULT AS IDENTITY (
    SEQUENCE NAME public.auth_group_permissions_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- Name: auth_permission; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.auth_permission (
    id integer NOT NULL,
    name character varying(255) NOT NULL,
    content_type_id integer NOT NULL,
    codename character varying(100) NOT NULL
);


ALTER TABLE public.auth_permission OWNER TO postgres;

--
-- Name: auth_permission_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

ALTER TABLE public.auth_permission ALTER COLUMN id ADD GENERATED BY DEFAULT AS IDENTITY (
    SEQUENCE NAME public.auth_permission_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- Name: auth_user; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.auth_user (
    id integer NOT NULL,
    password character varying(128) NOT NULL,
    last_login timestamp with time zone,
    is_superuser boolean NOT NULL,
    username character varying(150) NOT NULL,
    first_name character varying(150) NOT NULL,
    last_name character varying(150) NOT NULL,
    email character varying(254) NOT NULL,
    is_staff boolean NOT NULL,
    is_active boolean NOT NULL,
    date_joined timestamp with time zone NOT NULL
);


ALTER TABLE public.auth_user OWNER TO postgres;

--
-- Name: auth_user_groups; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.auth_user_groups (
    id bigint NOT NULL,
    user_id integer NOT NULL,
    group_id integer NOT NULL
);


ALTER TABLE public.auth_user_groups OWNER TO postgres;

--
-- Name: auth_user_groups_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

ALTER TABLE public.auth_user_groups ALTER COLUMN id ADD GENERATED BY DEFAULT AS IDENTITY (
    SEQUENCE NAME public.auth_user_groups_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- Name: auth_user_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

ALTER TABLE public.auth_user ALTER COLUMN id ADD GENERATED BY DEFAULT AS IDENTITY (
    SEQUENCE NAME public.auth_user_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- Name: auth_user_user_permissions; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.auth_user_user_permissions (
    id bigint NOT NULL,
    user_id integer NOT NULL,
    permission_id integer NOT NULL
);


ALTER TABLE public.auth_user_user_permissions OWNER TO postgres;

--
-- Name: auth_user_user_permissions_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

ALTER TABLE public.auth_user_user_permissions ALTER COLUMN id ADD GENERATED BY DEFAULT AS IDENTITY (
    SEQUENCE NAME public.auth_user_user_permissions_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- Name: django_admin_log; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.django_admin_log (
    id integer NOT NULL,
    action_time timestamp with time zone NOT NULL,
    object_id text,
    object_repr character varying(200) NOT NULL,
    action_flag smallint NOT NULL,
    change_message text NOT NULL,
    content_type_id integer,
    user_id integer NOT NULL,
    CONSTRAINT django_admin_log_action_flag_check CHECK ((action_flag >= 0))
);


ALTER TABLE public.django_admin_log OWNER TO postgres;

--
-- Name: django_admin_log_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

ALTER TABLE public.django_admin_log ALTER COLUMN id ADD GENERATED BY DEFAULT AS IDENTITY (
    SEQUENCE NAME public.django_admin_log_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- Name: django_content_type; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.django_content_type (
    id integer NOT NULL,
    app_label character varying(100) NOT NULL,
    model character varying(100) NOT NULL
);


ALTER TABLE public.django_content_type OWNER TO postgres;

--
-- Name: django_content_type_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

ALTER TABLE public.django_content_type ALTER COLUMN id ADD GENERATED BY DEFAULT AS IDENTITY (
    SEQUENCE NAME public.django_content_type_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- Name: django_migrations; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.django_migrations (
    id bigint NOT NULL,
    app character varying(255) NOT NULL,
    name character varying(255) NOT NULL,
    applied timestamp with time zone NOT NULL
);


ALTER TABLE public.django_migrations OWNER TO postgres;

--
-- Name: django_migrations_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

ALTER TABLE public.django_migrations ALTER COLUMN id ADD GENERATED BY DEFAULT AS IDENTITY (
    SEQUENCE NAME public.django_migrations_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- Name: django_session; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.django_session (
    session_key character varying(40) NOT NULL,
    session_data text NOT NULL,
    expire_date timestamp with time zone NOT NULL
);


ALTER TABLE public.django_session OWNER TO postgres;

--
-- Name: funcionarios_funcionario; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.funcionarios_funcionario (
    id bigint NOT NULL,
    rut character varying(12) NOT NULL,
    nombre character varying(150) NOT NULL,
    cargo character varying(100) NOT NULL,
    ppu character varying(10),
    usuario_sistema_id integer,
    destino character varying(150)
);


ALTER TABLE public.funcionarios_funcionario OWNER TO postgres;

--
-- Name: funcionarios_funcionario_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

ALTER TABLE public.funcionarios_funcionario ALTER COLUMN id ADD GENERATED BY DEFAULT AS IDENTITY (
    SEQUENCE NAME public.funcionarios_funcionario_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- Name: mapaestacionamiento_lugar; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.mapaestacionamiento_lugar (
    id bigint NOT NULL,
    id_lugar character varying(10) NOT NULL,
    ocupado_por_id bigint
);


ALTER TABLE public.mapaestacionamiento_lugar OWNER TO postgres;

--
-- Name: mapaestacionamiento_lugar_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

ALTER TABLE public.mapaestacionamiento_lugar ALTER COLUMN id ADD GENERATED BY DEFAULT AS IDENTITY (
    SEQUENCE NAME public.mapaestacionamiento_lugar_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- Name: mapaestacionamiento_registromovimiento; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.mapaestacionamiento_registromovimiento (
    id bigint NOT NULL,
    fecha_ingreso timestamp with time zone NOT NULL,
    fecha_salida timestamp with time zone,
    funcionario_id bigint NOT NULL,
    lugar_id bigint NOT NULL,
    area character varying(50),
    tipo_salida character varying(20),
    liberado_por_id integer
);


ALTER TABLE public.mapaestacionamiento_registromovimiento OWNER TO postgres;

--
-- Name: mapaestacionamiento_registromovimiento_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

ALTER TABLE public.mapaestacionamiento_registromovimiento ALTER COLUMN id ADD GENERATED BY DEFAULT AS IDENTITY (
    SEQUENCE NAME public.mapaestacionamiento_registromovimiento_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- Data for Name: administracion_configuracionsistema; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.administracion_configuracionsistema (id, clave_maestra) FROM stdin;
1	Thomas123
\.


--
-- Data for Name: auth_group; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.auth_group (id, name) FROM stdin;
1	Guardia
2	Profesor
3	Administrativo
4	Jefe de Seguridad
5	Director de Sede
6	Subdirectora de Sede
7	Cetecom
\.


--
-- Data for Name: auth_group_permissions; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.auth_group_permissions (id, group_id, permission_id) FROM stdin;
1	1	30
\.


--
-- Data for Name: auth_permission; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.auth_permission (id, name, content_type_id, codename) FROM stdin;
1	Can add log entry	1	add_logentry
2	Can change log entry	1	change_logentry
3	Can delete log entry	1	delete_logentry
4	Can view log entry	1	view_logentry
5	Can add permission	3	add_permission
6	Can change permission	3	change_permission
7	Can delete permission	3	delete_permission
8	Can view permission	3	view_permission
9	Can add group	2	add_group
10	Can change group	2	change_group
11	Can delete group	2	delete_group
12	Can view group	2	view_group
13	Can add user	4	add_user
14	Can change user	4	change_user
15	Can delete user	4	delete_user
16	Can view user	4	view_user
17	Can add content type	5	add_contenttype
18	Can change content type	5	change_contenttype
19	Can delete content type	5	delete_contenttype
20	Can view content type	5	view_contenttype
21	Can add session	6	add_session
22	Can change session	6	change_session
23	Can delete session	6	delete_session
24	Can view session	6	view_session
25	Can add Funcionario	7	add_funcionario
26	Can change Funcionario	7	change_funcionario
27	Can delete Funcionario	7	delete_funcionario
28	Can view Funcionario	7	view_funcionario
29	Can add lugar	8	add_lugar
30	Can change lugar	8	change_lugar
31	Can delete lugar	8	delete_lugar
32	Can view lugar	8	view_lugar
33	Can add registro movimiento	9	add_registromovimiento
34	Can change registro movimiento	9	change_registromovimiento
35	Can delete registro movimiento	9	delete_registromovimiento
36	Can view registro movimiento	9	view_registromovimiento
37	Can add Configuración del Sistema	10	add_configuracionsistema
38	Can change Configuración del Sistema	10	change_configuracionsistema
39	Can delete Configuración del Sistema	10	delete_configuracionsistema
40	Can view Configuración del Sistema	10	view_configuracionsistema
41	Can add Configuración del Sistema	11	add_configuracionsistema
42	Can change Configuración del Sistema	11	change_configuracionsistema
43	Can delete Configuración del Sistema	11	delete_configuracionsistema
44	Can view Configuración del Sistema	11	view_configuracionsistema
\.


--
-- Data for Name: auth_user; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.auth_user (id, password, last_login, is_superuser, username, first_name, last_name, email, is_staff, is_active, date_joined) FROM stdin;
2	pbkdf2_sha256$1200000$d8gthGP9jJJDmvkSWJ6Tuo$OTz7TEuuS0zVqhXnP+cNl5Loi05kkLhu61dEtJXcRz8=	\N	f	Guardia				f	t	2026-02-04 12:58:47-03
10	pbkdf2_sha256$1200000$9GoVRlc4167dPCev1w9DWT$MlVQamBCKAbSJ8UrzJGfAphUAs8mrAZzEj+msJDq0ZU=	\N	f	HCaceres	Hernan	Caceres		f	t	2026-02-10 13:59:23.71694-03
13	pbkdf2_sha256$1200000$JppWGsldS8l0uhiD1nVWCG$D9rv3TgPZli5aGV2JDR0VGJK7fu4ibb8V98mTulyrDU=	\N	f	TSoto	Thomas	Soto		f	t	2026-02-10 17:20:09.245862-03
16	pbkdf2_sha256$1200000$vwZ1FoS65odyiMmMB0EDQ4$N/zD8Z0Ro5rsTdyBcEeKttmzQws/OnJyrxN76OPDK7o=	\N	f	AContreras	Axel	Contreras		f	t	2026-02-10 17:30:08.255016-03
17	pbkdf2_sha256$1200000$zg0x79BgMGbQrap6FBIwRv$DXxVsuFltY6JEQi2/cWPfSmneLiWqBfZoaElx/px33I=	\N	f	JVallejos	Joel	Vallejos		f	t	2026-02-10 18:06:49.277163-03
18	pbkdf2_sha256$1200000$V2H9l3EYiEZuBGgtv7mvGp$u86zPFfpEkyHn7kpwYP41rbo+zTy390zhXLdfFgt3SU=	\N	f	VJeria	Valeska	Jeria		f	t	2026-02-11 11:55:11.040956-03
20	pbkdf2_sha256$1200000$5Gok2x7tU3HrN78MRMKmrG$x6a7qWVO9gVVF77kI/QEx6mqt8OIoZnLgWLB/uGNCu4=	2026-02-19 12:24:17.478172-03	t	Taizou			guido.sc15@gmail.com	t	t	2026-02-19 12:23:53.99151-03
\.


--
-- Data for Name: auth_user_groups; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.auth_user_groups (id, user_id, group_id) FROM stdin;
1	2	1
8	10	4
11	13	7
13	16	5
14	17	1
15	18	6
\.


--
-- Data for Name: auth_user_user_permissions; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.auth_user_user_permissions (id, user_id, permission_id) FROM stdin;
\.


--
-- Data for Name: django_admin_log; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.django_admin_log (id, action_time, object_id, object_repr, action_flag, change_message, content_type_id, user_id) FROM stdin;
6	2026-02-19 12:33:42.168743-03	427	Guido Soto (191723422)	3		7	20
7	2026-02-19 12:33:47.184005-03	429	Javier Jeria (153524756)	3		7	20
8	2026-02-19 12:33:51.308894-03	428	Leandro Araya (214796074)	3		7	20
9	2026-02-19 12:33:54.932119-03	430	Damian Soto (185643212)	3		7	20
10	2026-02-19 12:34:02.06774-03	431	Javiera Guzman (859634126)	3		7	20
\.


--
-- Data for Name: django_content_type; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.django_content_type (id, app_label, model) FROM stdin;
1	admin	logentry
2	auth	group
3	auth	permission
4	auth	user
5	contenttypes	contenttype
6	sessions	session
7	funcionarios	funcionario
8	mapaestacionamiento	lugar
9	mapaestacionamiento	registromovimiento
10	mapaestacionamiento	configuracionsistema
11	administracion	configuracionsistema
\.


--
-- Data for Name: django_migrations; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.django_migrations (id, app, name, applied) FROM stdin;
1	contenttypes	0001_initial	2026-02-04 12:56:21.04207-03
2	auth	0001_initial	2026-02-04 12:56:21.071347-03
3	admin	0001_initial	2026-02-04 12:56:21.08373-03
4	admin	0002_logentry_remove_auto_add	2026-02-04 12:56:21.087306-03
5	admin	0003_logentry_add_action_flag_choices	2026-02-04 12:56:21.090401-03
6	contenttypes	0002_remove_content_type_name	2026-02-04 12:56:21.097209-03
7	auth	0002_alter_permission_name_max_length	2026-02-04 12:56:21.101935-03
8	auth	0003_alter_user_email_max_length	2026-02-04 12:56:21.106092-03
9	auth	0004_alter_user_username_opts	2026-02-04 12:56:21.108895-03
10	auth	0005_alter_user_last_login_null	2026-02-04 12:56:21.112119-03
11	auth	0006_require_contenttypes_0002	2026-02-04 12:56:21.113176-03
12	auth	0007_alter_validators_add_error_messages	2026-02-04 12:56:21.117194-03
13	auth	0008_alter_user_username_max_length	2026-02-04 12:56:21.122828-03
14	auth	0009_alter_user_last_name_max_length	2026-02-04 12:56:21.126306-03
15	auth	0010_alter_group_name_max_length	2026-02-04 12:56:21.130913-03
16	auth	0011_update_proxy_permissions	2026-02-04 12:56:21.137585-03
17	auth	0012_alter_user_first_name_max_length	2026-02-04 12:56:21.144475-03
18	funcionarios	0001_initial	2026-02-04 12:56:21.15332-03
19	funcionarios	0002_funcionario_usuario_sistema	2026-02-04 12:56:21.160629-03
20	mapaestacionamiento	0001_initial	2026-02-04 12:56:21.180338-03
21	sessions	0001_initial	2026-02-04 12:56:21.184098-03
22	mapaestacionamiento	0002_configuracionsistema_registromovimiento_activo	2026-02-11 17:00:40.45917-03
23	mapaestacionamiento	0003_registromovimiento_activo	2026-02-11 17:05:53.243495-03
24	funcionarios	0003_funcionario_destino	2026-02-16 11:53:28.360584-03
25	mapaestacionamiento	0002_registromovimiento_area	2026-02-16 11:53:28.408851-03
26	funcionarios	0004_alter_funcionario_ppu	2026-02-16 14:50:12.752902-03
27	mapaestacionamiento	0003_registromovimiento_ppu	2026-02-16 14:50:12.76684-03
28	mapaestacionamiento	0004_remove_registromovimiento_ppu	2026-02-16 16:22:28.729279-03
29	mapaestacionamiento	0005_registromovimiento_tipo_salida	2026-02-17 10:13:10.108406-03
30	mapaestacionamiento	0006_registromovimiento_liberado_por	2026-02-17 10:55:23.557543-03
31	administracion	0001_initial	2026-02-18 12:06:05.469134-03
32	mapaestacionamiento	0007_delete_configuracionsistema_remove_lugar_ocupado_and_more	2026-02-18 12:06:05.499919-03
\.


--
-- Data for Name: django_session; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.django_session (session_key, session_data, expire_date) FROM stdin;
se7hg19351xqcovq1dnyh9sx0k8ch5ep	.eJxVjMEOwiAQBf-FsyFAoYBH7_0GsrCLVA0kpT0Z_92Q9KDXNzPvzQIcewlHpy2syK5MssvvFiE9qQ6AD6j3xlOr-7ZGPhR-0s6XhvS6ne7fQYFeRm2Nn0homoVyRmuLiew0kctRJed1Rp_RRhU9gCQpjAfjHIGfAbVRln2-34437w:1vnfGG:oGNW2AVkBTSlEl3dx2ReAsWcRnHblnFppc-ojiGIydI	2026-02-18 12:57:48.084815-03
gxigc2o1wfbtyduyzk0ko0sjve4r1o62	.eJxVjEEOwiAQAP-yZ0PapYD06L1vILuwSNXQpLQn499Nkx70OjOZNwTatxL2JmuYE4yAHVx-IVN8Sj1MelC9LyoudVtnVkeiTtvUtCR53c72b1CoFRjBWdbZ2oioozGDaLlq5JT7TDpyTuQp9wa5M8mis1kEB0ZD2ntvnUT4fAEYnTiZ:1vt5t3:NC-9b8GqSqAF-ebpVql8ydBKV6N-UQ6upcWI1HUdq98	2026-03-05 12:24:17.479637-03
\.


--
-- Data for Name: funcionarios_funcionario; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.funcionarios_funcionario (id, rut, nombre, cargo, ppu, usuario_sistema_id, destino) FROM stdin;
1	197788232	ADRIAN ANTONIO  SUMOZA  SUMOZA	Auxiliar de Servicios Generales		\N	\N
2	135777110	AÍDA PAOLA SANDOVAL PALMA	Director(a) de Carreras de Administración y Negocios	PSBC51	\N	\N
3	94090369	ALBERTO EDMUNDO CARRILLO MUÑOZ	Docente Asistente	FPXF56	\N	\N
4	90358936	ALEJANDRA TAMARA FUENTES MUÑOZ	Auxiliar de Servicios Generales		\N	\N
5	125021050	ALEX ANTONIO BUENO PEREZ	Auxiliar de Mantención	YG4730	\N	\N
6	132556059	ALEX MIGUEL CARUZ ROA	Docente Asistente Inicial		\N	\N
7	160869879	ALEXIS ALEJANDRO RIOS LAGOS	Docente Asistente Inicial	HKPS45	\N	\N
8	132920281	ALEXIS HUMBERTO OLAVE HERNANDEZ	Docente Asistente	TFVY55	\N	\N
9	10184336K	ALFONSO FRACIER CORTES GARCIA	Docente Asistente	SXPX93	\N	\N
10	161931500	ALICIA ANDREA DIAZ GOMEZ	Docente Asistente Adjunto	SLXJ45	\N	\N
11	189745168	ALONSO IGNACIO IBARRA GONZALEZ	Docente Asistente Inicial	RD4282	\N	\N
12	136965638	ALVARO ANTONIO RUBILAR DONOSO	Docente Asistente		\N	\N
13	183809520	ALVARO PATRICIO ALBORNOZ MONZON	Docente Asistente Inicial		\N	\N
14	164095428	AMBAR VIOLETA CACERES MUÑOZ	Docente Asistente	GYXW70	\N	\N
15	184998963	ANA BELEN  LEIVA  LOPEZ	Encargado(a) de Adquisiciones		\N	\N
16	94616808	ANA DEL CARMEN ARAYA BRIONES	Auxiliar de Seguridad		\N	\N
17	82204334	ANA REGINA ROJAS GUTIERREZ	Docente Asistente	RKRS94	\N	\N
18	177790478	ANDREA BELEN GARCIA GALAZ	Coordinador(a) de Bienestar Estudiantil		\N	\N
19	153436428	ANDREA BENITA TORRES ALVAREZ	Docente Asistente Inicial		\N	\N
20	165209281	ANDREA CAROLINA MONSALVE TAMAYO	Docente Asistente		\N	\N
21	136657348	ANDREA ELENA  VARGAS VELOSO	Docente Asistente Inicial		\N	\N
22	169162522	ANDRES  FREDES  CARDENAS	Ingeniero de Control de Gestión		\N	\N
23	122839737	ANDRES TOMAS DIAZ PEÑA	Administrativo(a) de Contabilidad		\N	\N
24	162721704	ANGEL GUSTAVO OYARZUN CONTRERAS	Docente Asistente Inicial	GTWD48	\N	\N
25	25765544k	ANGELO SANTOMAURO MONASTERIO	Coordinador(a) de Asuntos Estudiantiles		\N	\N
26	106456151	ANNIETTE XIMENA MORALES AVILA	Auxiliar de Servicios Generales		\N	\N
27	174623554	ANYELA DANIELA ESTRELLA MARTINEZ ALARCON	Docente Asistente Extracurricular		\N	\N
28	219953712	ARIEL NAIR ULLOA ALVARADO	Auxiliar de Servicios Generales		\N	\N
29	88356152	ARIEL RENAN REYES ZULETA	Docente Asistente		\N	\N
30	136711326	ARMANDO ANTONIO PEREZ MUÑOZ	Docente Asistente	GWTS71	\N	\N
31	105033230	AXEL EDGARDO CONTRERAS REITTER	Director(a) de Sede	SVDL73	\N	\N
32	192766389	AYRTON FELIPE CORTES MORALES	Docente Asistente		\N	\N
33	193160263	BARBARA ALEJANDRA ARAYA REYES	Coordinador(a) de Carrera		\N	\N
34	198783196	BARBARA CONSTANZA VIDELA MUÑOZ	Coordinador(a) de Carrera		\N	\N
35	181926279	BARBARA DE LAS NIEVES  TORO RIVEROS	Docente Asistente Inicial	TKCR92	\N	\N
36	180789537	BARBARA DEL CARMEN MATAMALA FARIAS	Docente Asistente Inicial	JYKB89	\N	\N
37	175627820	BARBARA ELIZABETH JAQUE DE LA JARA	Docente Asistente	KWFT85	\N	\N
38	14383459K	BARBARA PAZ FARIAS ALVAREZ	Coordinador(a) de Práctica		\N	\N
39	161246719	BARBARA VALERIA CERDA SOLIS	Docente Asistente  Inicial	KKPF72	\N	\N
40	204473463	BASTIAN ALEJANDRO LARRONDO GALLO	Operador(a) de Soporte TIC		\N	\N
41	193751865	BASTIAN ALFREDO HERNANDEZ CONSTANZO	Docente Asistente Inicial	LYTP78	\N	\N
42	20147261K	BASTIAN ANDRES  MENESES MUÑOZ	Docente Asistente Inicial		\N	\N
43	19513149K	BASTIAN ARIEL FUENZALIDA MOYA	Docente Asistente	TBTD77	\N	\N
44	186676378	BELEN PAULINA NUÑEZ ALARCON	Docente Asistente	KPVX40	\N	\N
45	98251774	BERNARDITA DEL PILAR SOTO CASTRO	Jefe Biblioteca	GIHJ91	\N	\N
46	178350013	BERNARDO JAVIER VALENZUELA URIBE	Docente Asistente Extracurricular	CWKH71	\N	\N
47	152535201	BERZABE NOEMI VASQUEZ HERNANDEZ	Operador(a) DARA		\N	\N
48	175338446	BORIS BERNARD PRIETO ABARCA	Jefe(a) de Deporte y Actividad Física Sede		\N	\N
49	177651389	CAMILA FERNANDA RODRIGUEZ OYANEDEL	Coordinador(a) de Carrera		\N	\N
50	192273145	CAMILA FRANCISCA  CABRERA  MANRIQUEZ	Asistente Biblioteca		\N	\N
51	176739460	CAMILA NIRKA TORO ZAMORANO	Docente Asistente	BYXT67	\N	\N
52	172544207	CAMILO ALEJANDRO PALMA PINTO	Docente Asistente	HJYX68	\N	\N
53	141485067	CARLA ERIELE MANZANO VENEGAS	Subdirector(a) de Desarrollo Estudiantil y Titulados	TCPY38	\N	\N
54	116284103	CARLOS ADAN MORIS GUAJARDO	Docente Asistente	SWLD41	\N	\N
55	129019387	CARLOS ALBERTO ZUÑIGA LUNA	Docente Asistente Inicial	FLTJ34	\N	\N
56	83009411	CARLOS EDUARDO LOPEZ SILVA	Docente Asociado		\N	\N
57	104461018	CARLOS RAÚL OJEDA ESCALANTE	Docente Asistente	DRJT53	\N	\N
58	134878010	CARMEN CECILIA MANZANO DONOSO	Docente Asistente	JTSB54	\N	\N
59	194511647	CAROLAIN GORETTY DURAN ARANCIBIA	Docente Asistente		\N	\N
60	128826904	CAROLINA ALEJANDRA DONOSO DELGADILLO	Docente Asistente Adjunto	LKBF65	\N	\N
61	161461571	CAROLINA ALEJANDRA HORMAZABAL CUEVAS	Docente Asistente	TFXL35	\N	\N
62	16775807K	CAROLINA ANDREA QUINIO ESPINOZA	Docente Asociado		\N	\N
63	159174573	CAROLINA ANDREA SAAVEDRA CAÑAS	Docente Asociado		\N	\N
64	132880352	CAROLINA DE LAS MERCEDES YAÑEZ CESPEDES	Operador(a) DARA		\N	\N
65	168410840	CAROLINA DE LOS ANGELES CARRASCO LOZA	Docente Asistente Inicial		\N	\N
66	173844999	CAROLINA PAZ MUÑOZ MARTINEZ	Docente Asistente Inicial		\N	\N
67	177648167	CATALINA BELEN MUÑOZ BRIONES	Docente Asistente Inicial		\N	\N
68	139008014	CATHERINE ROSA CORNEJO ROJAS	Docente Asistente	LXBL38	\N	\N
69	169616922	CESAR ANDRES JIMENEZ JORQUERA	Docente Asociado	RSHW75	\N	\N
70	175984992	CESAR ANTONIO PALMA ARAYA	Docente Asistente	CRYK66	\N	\N
71	199153730	CINDY NAYARETT CIFUENTES PADILLA	Docente Asistente Inicial	LLJK15	\N	\N
72	155361573	CLAUDIA ANDREA ABARZUA SEPULVEDA	Jefe DARA		\N	\N
73	139366352	CLAUDIA ANDREA CARRERAS CASTILLO	Docente Asistente	LJSY15	\N	\N
74	161908193	CLAUDIA MACARENA REYES ORELLANA	Coordinador(a) General Docente	DTWH48	\N	\N
75	178116878	CLAUDIA MAGDALENA ROMERO MEZA	Docente Asistente Inicial		\N	\N
76	162356151	CLAUDIA PAZ UMANZOR ESPINOZA	Docente Asistente Inicial	DYBX23	\N	\N
77	201809460	CLAUDIO ALFREDO BARRAZA BERRIOS	Docente Asistente	GZFZ62	\N	\N
78	84468045	CLAUDIO ANDRES ARANEDA SARAVIA	Pañolero		\N	\N
79	144682416	CLAUDIO ANDRES VALENZUELA HERRERA	Auxiliar de Mantención	FTLZ32	\N	\N
80	92679799	CLAUDIO ANTONIO  QUINTANA VALDERRAMA	Docente Asistente Inicial		\N	\N
81	125216234	CLAUDIO ANTONIO FUENTES REYES	Docente Asistente		\N	\N
82	197210044	CONSTANZA CECILIA  GONZALEZ  SILVA	Administrativo(a) de Personas		\N	\N
83	166805376	CONSTANZA CONSUELO CABEZA ROJAS	Jefe(a) de Financiamiento		\N	\N
84	201008204	CONSTANZA FRANCISCA JARA HUGHES	Docente Asistente Inicial		\N	\N
85	175401075	CONSUELO MAKARENA CANALES ALVEAR	Docente Asistente Inicial		\N	\N
86	155549440	CRISTHIAN EDUARDO GARCES MONTOYA	Docente Asociado	GPJW80	\N	\N
87	183294180	CRISTIAN ALEJANDRO  RAMIREZ  AHUMADA	Bibliotecólogo(a) Referencista		\N	\N
88	161900788	CRISTIAN ANDRES CONCHA AVENDAÑO	Docente Asistente	PHYK69	\N	\N
89	151888860	CRISTIAN ANDRES MORENO SANHUEZA	Docente Asistente Inicial		\N	\N
90	174229287	CRISTIAN ANDRES PIZARRO BURGOS	Docente Asistente		\N	\N
91	18105512K	CRISTIAN IGNACIO STUARDO TAPIA	Docente Asistente Inicial		\N	\N
92	177764965	CRISTIAN MARCELO TREJO NECUL	Docente Asistente	GKDS51	\N	\N
93	114732435	CRISTIAN ORLANDO GARCIA GUTIERREZ	Docente Asociado	GWBD16	\N	\N
94	156339253	CRISTOBAL VILAXA ARAYA	Docente Asistente	STFJ84	\N	\N
95	165200381	DAISY VIOLANDA MASIAS MALDONADO	Docente Asociado	CWSZ48	\N	\N
96	182877123	DAMARIS PAULINA ROJAS QUIROZ	Docente Asistente Inicial		\N	\N
97	156213551	DAMARIS YOLANDA BEROIZA VALENZUELA	Jefe (a) UAP		\N	\N
98	170025636	DANIEL ALEJANDRO  SANCHEZ FUENTES	Docente Asistente Inicial		\N	\N
99	191945816	DANIEL ALEJANDRO OLATE HIGUERA	Docente Asistente Inicial		\N	\N
100	161729841	DANIEL ANDRES  PONCE  ROSALES	Docente Asistente Inicial		\N	\N
101	174644918	DANIEL ANDRES ARRIBAS ALBADIZ	Docente Asistente		\N	\N
102	99805943	DANIEL ANDRES MONDACA CORREA	Docente Asistente		\N	\N
103	154734740	DANIEL FELIPE ROBLES PAREDES	Docente Asistente Inicial		\N	\N
104	17926966K	DANIEL HUMBERTO VALENZUELA CARRASCO	Docente Asistente Inicial	TGHL95	\N	\N
105	157870637	DANIELA ELENA  DIAZ CONTRERAS	Docente Asistente Inicial		\N	\N
106	170482433	DANIELA FERNANDA SOTO MORALES	Docente Asistente Inicial		\N	\N
107	181174617	DANIELA FRANCISCA PORFLIT FUENTES	Coordinador(a) de Vinculación e Integración Institucional		\N	\N
108	156199559	DANIELA MORIN YAÑEZ CONTRERAS	Docente Asistente Inicial	HYBY67	\N	\N
109	174772991	DANIELA NICOLE MUÑOZ NUÑEZ	Docente Asistente Inicial	LDBJ84	\N	\N
110	175600558	DANIELA VIVIANA FRIAS ARANDA	Docente Asistente	PFHB61	\N	\N
111	97914486	DANTE JOSE ANTONIO DIAZ RIQUELME	Docente Asistente Inicial		\N	\N
112	161704547	DARIO IGNACIO VILLAFRANCA  GUZMAN	Coordinador(a) de Bienestar Estudiantil		\N	\N
113	167409253	DAVID ANTONIO LOPEZ BARRA	Docente Asistente		\N	\N
114	153613044	DAVID CARLOS SANTOS DIAZ	Docente Asistente		\N	\N
115	162782517	DAVID IGNACIO CONTRERAS GALLARDO	Docente Asistente		\N	\N
116	190359182	DIEGO ABRAHAM ABUGARADE MÜLLER	Operador(a) DARA		\N	\N
117	179069512	DIEGO ALEJANDRO PEREZ MONTENEGRO	Docente Asistente Inicial	SJXC51	\N	\N
118	181206101	DIEGO ALEJANDRO VELIZ ARAYA	Docente Asistente Inicial	KBKW13	\N	\N
119	191889126	DIEGO ANDRES FREIRE CAYUFILO	Docente Asistente Inicial		\N	\N
120	177393940	DIEGO ANDRES GONZALEZ  SALAS	Docente Asistente Inicial		\N	\N
121	189084196	DIEGO ANDRES TORDECILLA NEIRA	Operador(a) CETECOM	HJKG41	\N	\N
122	160310359	DIEGO EDUARDO AGUILERA ZAMBRANO	Docente Asistente Inicial	CCPW11	\N	\N
123	169140049	DIEGO EUGENIO ESPINOSA DE LA FUENTE	Director(a) de Carreras de Ingeniería	PPVZ52	\N	\N
124	124985749	DOMINGO AURELIO GONZALEZ TAPIA	Auxiliar de Mantención		\N	\N
125	178032712	EBER ARIEL GOMEZ MUÑOZ	Docente Asistente	FVKW94	\N	\N
126	184556871	EDGARDO FABIAN FUENTES SANZANA	Cajero		\N	\N
127	174997721	EDITH MARJORIE SUAREZ SOTO	Director(a) de Carreras de Salud		\N	\N
128	94029872	EDUARDO CHRISTIAN RODRIGUEZ MOLINA	Docente Asistente	CHVS39	\N	\N
129	172699731	EDUARDO ENRIQUE SALCEDO CAMPOS	Docente Asistente Inicial	JHKL56	\N	\N
130	170898745	ELIANA ERMELINDA DE JESUS SISTO MARTINEZ	Docente Asistente Inicial		\N	\N
131	165218620	ELIZABETH JAQUELINE GALAZ GOMEZ	Jefe(a) Programa Matemáticas	GKWJ85	\N	\N
132	175003894	ELIZABETH ODETTE ROJAS SALAS	Docente Asistente Inicial	RZTS65	\N	\N
133	204205167	EMANUEL ELIAZAR GONZALEZ TUDELA	Asistente de Comunicaciones y Medios Digitales		\N	\N
134	14340675K	ERNESTO ALBERTO AHUMADA OLATE	Docente Asistente Extracurricular	HSWT47	\N	\N
135	139150929	ESTEBAN BORIS PONCE GUTIERREZ	Docente Asistente	KGVY42	\N	\N
136	143841774	EVELYN JOSEFINA GUERRERO FARIAS	Coordinador(a) Mesa de Servicios	RTZZ73	\N	\N
137	173861656	EVELYN VALESKA ACUÑA FORMANDOY	Docente Asistente		\N	\N
138	157069675	EVELYN VANESSA ZAMORA VILLALOBOS	Docente Titular	GZKV56	\N	\N
139	177653144	FABIAN ALEJANDRO ALCANTARA GUAJARDO	Docente Asistente	PZCB40	\N	\N
140	183285599	FABIAN ANTONELLO REVILLAR BAVESTRELLO	Docente Asistente Inicial		\N	\N
141	162673866	FABIAN ANTONIO MENA CARO	Docente Asistente		\N	\N
142	16158021K	FABIAN IGNACIO NAVARRO GONZALEZ	Docente Asistente	PYDB30	\N	\N
143	16666912K	FABIOLA CAROLINA OSSA OLIVEROS	Docente Asistente Inicial	KKGY59	\N	\N
144	125134963	FABIOLA DEL CARMEN MEDINA DATTOLI	Auxiliar de Servicios Generales		\N	\N
145	130058280	FABIOLA NATALIA OLCAY SEPULVEDA	Docente Asistente	LXRT92	\N	\N
146	161208000	FELIPE ANDRES CORDERO LIRA	Docente Asistente Inicial		\N	\N
147	151799450	FELIPE ANDRES ZARATE SAN MARTIN	Docente Asistente	HBSR74	\N	\N
148	153166099	FELIPE ANTONIO PEREIRA SALAS	Docente Asistente Inicial		\N	\N
149	185134792	FELIPE IGNACIO FERNANDEZ MORALES	Operador(a) CETECOM	SKDD74	\N	\N
150	187172829	FELIPE OCTAVIO PINTO ARÁNGUIZ	Docente Asistente	FRTZ84	\N	\N
151	164292207	FERNANDA PAZ  HUARACAN ROJAS	Docente Asistente Inicial		\N	\N
152	159181219	FERNANDA VERONICA VALDIVIESO ARRIAGADA	Docente Asistente Adjunto		\N	\N
153	105000995	FERNANDO SIMON CORTEZ RIVERA	Jefe(a) de Programa Transversal de Innovación y Emprendimiento		\N	\N
154	94011957	FLAVIO ALONSO ZUÑIGA DIAZ	Docente Asistente		\N	\N
155	132726256	FLAVIO ESTEBAN CONSTANZO ROMAN	Director(a) de Carreras de Administración y Negocios	JJRW33	\N	\N
156	168767803	FRANCISCA BEATRIZ ESCUDERO ESPINOZA	Docente Asistente	JDFK30	\N	\N
157	105556292	FRANCISCO ALEJANDRO  SALINAS  ALVIAL	Docente Asistente Inicial		\N	\N
158	150712432	FRANCISCO ANDRES CORREA ORTIZ	Docente Asistente Inicial		\N	\N
159	189264836	FRANCISCO IGNACIO LOPEZ ACEVEDO	Docente Asistente Extracurricular		\N	\N
160	216807839	FRANCISCO JAVIER  MORALES  OSORIO	Auxiliar de Servicios Generales	BWDY20	\N	\N
161	19115620K	FRANCISCO JAVIER AUGUSTO GARAY ASPE	Docente Asistente Inicial	PHZS51	\N	\N
162	138404811	FRANCISCO JAVIER CONTRERAS YANTEN	Docente Asistente Inicial		\N	\N
163	104944469	FRANCISCO JAVIER DEL ROSARIO LOPEZ TORRES	Docente Asistente Inicial	LBWH55	\N	\N
164	160682523	FRANCISCO JAVIER GONZALEZ MACHUCA	Docente Asistente Inicial	DBDR	\N	\N
165	166631734	FRANCISCO JAVIER ROJAS COLONELLI	Docente Asistente Inicial		\N	\N
166	173161697	FRANCISCO JAVIER TIYEI ARANGUIZ VALENZUELA	Docente Asistente Inicial	STTV32	\N	\N
167	136705482	GABRIEL EMILIO GALLEGO SOZA	Docente Asistente Inicial		\N	\N
168	71662381	GABRIEL HUMBERTO AGUILERA ROJAS	Docente Asistente	HJ2591	\N	\N
169	136177745	GASTON ADOLFO VILLARROEL HERNANDEZ	Docente Asistente	SWRL93	\N	\N
170	191355636	GIOVANNI VINCCENZO PALAVECINO  RAMIREZ	Docente Asistente Inicial		\N	\N
171	191165527	GISSELLE ESTEFANY VIVEROS JAZMEN	Docente Asistente		\N	\N
172	11588834K	GLADYS MARILUZ RAMIREZ HERNANDEZ	Auxiliar de Servicios Generales		\N	\N
173	128621806	GONZALO ALEJANDRO CORTES MONTERO	Docente Asistente		\N	\N
174	189421486	GONZALO EDUARDO ROJAS  RIVERA	Pañolero		\N	\N
175	135491403	GONZALO ENRIQUE GAETE LETELIER	Generalista de Personas		\N	\N
176	153530009	GONZALO RODRIGO SALINAS MUÑOZ	Coordinador(a) de Carrera	CHRC88	\N	\N
177	169007039	GUSTAVO ENRIQUE CABEZAS CATALAN	Docente Asistente Inicial	GHRF48	\N	\N
178	85140353	HELGA ANDREA GARRIDO REBOLLEDO	Docente Asistente		\N	\N
179	191889487	HERNAN ALEJANDRO CHANQUEO BURGOS	Docente Asistente	LPDH61	\N	\N
180	69720269	HERNAN MARINKOVIC PLAZA	Docente Asistente	BGLT12	\N	\N
181	127985057	HILDA ELIZABETH MEZA URREA	Operador(a) DARA		\N	\N
182	102202023	HORACIO OSVALDO DOLLENZ CASTRO	Docente Asistente Inicial	PRSS30	\N	\N
183	182850756	IGNACIO ALFONSO MOREIRA MORALES	Docente Asistente Inicial		\N	\N
184	167883273	IGNACIO JAVIER VILLARROEL SANCHEZ	Docente Asistente	SWRL93	\N	\N
185	109277398	JACQUELINE DEL CARMEN CAMPOS MARDONES	Auxiliar de Servicios Generales		\N	\N
186	89477778	JACQUELINE LEONOR OLIVARES OYARZUN	Docente Asociado		\N	\N
187	132643792	JAIME CRISTIAN BRAVO MENESES	Docente Asistente Inicial		\N	\N
188	08277226K	JAIME DANIEL MERINO CONTRERAS	Docente Asistente	RHWX80	\N	\N
189	13037266K	JAIME NOLASCO CABAÑA MEDINA	Docente Asistente	KCVW95	\N	\N
190	132581991	JANET MARCELA MUÑOZ LEIVA	Auxiliar de Servicios Generales		\N	\N
191	128195084	JAVIER ALFONSO CARRASCO ZAMORA	Docente Asistente	JJVB92	\N	\N
192	186272269	JAVIER ANDRES HERNANDEZ DIAZ	Docente Asistente	PGPP23	\N	\N
193	164843750	JAVIER IGNACIO AVALOS VARELA	Docente Asistente Inicial		\N	\N
194	196330186	JAVIERA ALICIA FUENTES TORRES	Docente Asistente		\N	\N
195	129106514	JEANNETTE ANGELICA JIMENEZ VERA	Asistente de Desarrollo Estudiantil	JSPD46	\N	\N
196	109810592	JEANNETTE MARICEL ULLOA ARANCIBIA	Docente Asistente Inicial		\N	\N
197	157995081	JENNIFER NATALIA UTRERAS CANIULAF	Secretaria(o) de Carrera		\N	\N
198	153589259	JESSICA VALESKA CERDA VASQUEZ	Coordinador(a) General Académico		\N	\N
199	155388765	JESUS MAURICIO CERDA VALDES	Docente Asistente		\N	\N
200	174639787	JOAQUIN ALEJANDRO FUENTES DARUICH	Docente Asistente	LWYF40	\N	\N
201	178918427	JOAQUIN ANTONIO GAJARDO CANALES	Docente Asistente Inicial		\N	\N
202	164198855	JOAQUIN FELIPE RAMIREZ SEPULVEDA	Docente Asistente Inicial		\N	\N
203	106686300	JOEL ANTONIO VALLEJOS SAEZ	Auxiliar de Seguridad		\N	\N
204	169029571	JOHANNA ELIZABETH SAEZ LEON	Auxiliar de Servicios Generales		\N	\N
205	138288013	JOHN PAUL BARRIL ARENAS	Docente Asistente	HYCX98	\N	\N
206	169159238	JONATHAN ISRAEL DONOSO VARGAS	Docente Asistente		\N	\N
207	186758218	JORDANI ANTONIO PINTO SANTANDER	Pañolero	LDPP96	\N	\N
208	196686932	JORGE ALEJANDRO MUNOZ SALAZAR	Docente Asistente Extracurricular		\N	\N
209	134358696	JORGE ANDRES DAWABE VALLE	Docente Asistente Inicial		\N	\N
210	120261525	JORGE ANDRES DEL SAGRADO CORAZON VASQUEZ MONARDES	Auxiliar de Seguridad		\N	\N
211	130925391	JORGE ANDRES FERNANDEZ LAMILLA	Docente Asistente	LSPD64	\N	\N
212	16032189K	JORGE ANDRES SALAS GUZMAN	Docente Asistente Inicial		\N	\N
213	74545084	JORGE ANTONIO VALENZUELA PEREZ	Auxiliar de Servicios Generales		\N	\N
214	194307551	JORGE IGNACIO OLGUIN GUERRA	Docente Asistente Inicial	HDXP17	\N	\N
215	191156900	JORGE LUIS CASTILLO GONZALEZ	Estafeta/Chofer		\N	\N
216	13046467K	JOSE IGNACIO OCAMPO BERRIOS	Docente Asistente	RYZP66	\N	\N
217	135959405	JOSE LUIS VALLEJOS PADILLA	Docente Asistente		\N	\N
218	99838876	JOSE LUIS VILLABLANCA MORAGA	Docente Asistente		\N	\N
219	138068781	JOSE PEDRO ANTIMAN POCOL	Pañolero	PCYS67	\N	\N
220	07365680K	JOSE RAUL PINILLA CASTILLO	Docente Asistente		\N	\N
221	121262916	JOSE RODRIGO MIRANDA HERNANDEZ	Docente Asistente Inicial		\N	\N
222	106760713	JOSE SERGIO COLLIO HUENUN	Docente Asistente		\N	\N
223	199619837	JOSEFA ISIDORA ACEVEDO BARRIGA	Docente Asistente Inicial		\N	\N
224	204030324	JOSEFA PAULETTE RIVERA QUIROZ	Coordinador(a) de Laboratorio	LVGC80	\N	\N
225	92265641	JUAN ALBERTO CAMPOS ECHEVERRIA	Auxiliar de Seguridad		\N	\N
226	157608010	JUAN ANDRES SAEZ RETAMALES	Docente Asistente		\N	\N
227	112660747	JUAN ANTONIO CARRASCO NAVARRETE	Docente Asociado		\N	\N
228	166936373	JUAN BERNARDO LONCON PAILLAN	Docente Asistente Extracurricular	LXPW11	\N	\N
229	162546120	JUAN CARLOS CANTILLANA MARIN	Docente Asistente	FHKR76	\N	\N
230	196999906	JUAN JOSE MORALES MORALES	Coordinador(a) de Laboratorio		\N	\N
231	164189775	JUAN PABLO DIAZ PEREZ	Gestor(a) de Pastoral		\N	\N
232	106746923	JUAN RAUL MARAMBIO CARRASCO	Docente Asistente		\N	\N
233	165454340	KAREN ANDREA LILLO RODRIGUEZ	Docente Asistente Inicial	FXTR15	\N	\N
234	166569893	KARIN ZITA ZAMORANO IRRIBARRA	Docente Asistente		\N	\N
235	171452015	KATIA ALEJANDRA  GALVEZ  MUNOZ	Coordinador(a) de Carrera		\N	\N
236	183605348	KEVIN ISMAEL GARCIA RAMIREZ	Jefe de Servicios Generales	KVPG68	\N	\N
237	191170644	KEVIN ROJAS GODOY	Especialista en Soporte TIC	AAB666	\N	\N
238	151453937	LEONARDO JOSE JAQUE GUTIERREZ	Docente Asistente Inicial		\N	\N
239	169096449	LEONARDO NICOLAS MADARIAGA FARIAS	Docente Asistente Inicial		\N	\N
240	94956390	LEONEL JULIO SANCHEZ ARAYA	Docente Asociado	LPGP49	\N	\N
241	168338775	LESLEY SINDY ORTEGA MUÑOZ	Docente Asistente Inicial	HHVY94	\N	\N
242	162155571	LETICIA LORETO TRONCOSO PEÑA	Auxiliar de Seguridad		\N	\N
243	194302177	LIDIA FERNANDA DIAZ ALARCON	Coordinador(a) de Carrera		\N	\N
244	121206153	LISANDRO NOE MARIQUEO LEAL	Auxiliar de Servicios Generales		\N	\N
245	238976561	LLINA CONSUELO REYES CASTAÑO	Docente Asistente Inicial		\N	\N
246	169189919	LUCIA VIRGINIA RODRIGUEZ CONTRERAS	Docente Asistente Inicial		\N	\N
247	164517551	LUIS ALBERTO BUSTAMANTE PALOMERA	Docente Asistente Inicial		\N	\N
248	143817318	LUIS ANTONIO MATELUNA ITURRIETA	Docente Asistente	HPVZ42	\N	\N
249	112639195	LUIS ENRIQUE PRADENAS PEREZ	Docente Asistente	KVDH62	\N	\N
250	154543953	LUIS FRANCISCO CONTRERAS GALLARDO	Docente Asistente Inicial	BZCK71	\N	\N
251	104469191	LUIS GABRIEL MEJIAS AGUILERA	Auxiliar de Seguridad		\N	\N
252	90633546	LUIS HUMBERTO CANCINO ESPINOZA	Coordinador(a) de Laboratorio	RHSK47	\N	\N
253	78402385	LUIS LEONARDO ATENCIO DIAZ	Docente Asistente	GRSV59	\N	\N
254	137147653	LUIS RENAN BUSTAMANTE MUÑOZ	Auxiliar de Seguridad		\N	\N
255	185591557	MACARENA CONSTANSA RAMÍREZ VALENCIA	Docente Asistente		\N	\N
256	155010576	MACARENA PALOMA PILAR ROJAS CORDOVA	Docente Asistente		\N	\N
257	13242148K	MAGDALENA CAROLINA CORREA BENGURIA	Docente Asociado	FCKV53	\N	\N
258	163929104	MAHYCKOL ALBERTO FUENZALIDA RETAMAL	Docente Asistente	LPCX86	\N	\N
259	10921809K	MALVA ELIANA PEREZ BUSTOS	Docente Asistente		\N	\N
260	152021135	MANUEL ALEJANDRO GALLARDO VERGARA	Docente Asistente		\N	\N
261	155411139	MANUEL ALEJANDRO JARA SANCHEZ	Docente Asistente	CHVH98	\N	\N
262	10626886K	MANUEL FRANCISCO PALMA SAEZ	Docente Asociado	FXSL63	\N	\N
263	120230743	MANUEL HUMBERTO ROMERO AGUILERA	Docente Asistente		\N	\N
264	134576642	MARCELA ANDREA ORELLANA SILVA	Docente Asistente		\N	\N
265	207140686	MARCELO ALEJANDRO SANTIBAÑEZ ROJAS	Docente Asistente	RDTD62	\N	\N
266	133419268	MARCELO ANDRES YAÑEZ PULGAR	Docente Asistente Adjunto	KXTT39	\N	\N
267	97751323	MARCELO ANTONIO CAMPOS CAMPOS	Docente Asistente Inicial	JSGL89	\N	\N
268	156205524	MARCELO PATRICIO SEPULVEDA OYANEDEL	Docente Asistente		\N	\N
269	161506184	MARCO ANDRES LLAULEN MARTINEZ	Docente Asistente Inicial	GBJR36	\N	\N
270	103223857	MARCO ANTONIO CRISTIAN GUERRERO ESPINOZA	Docente Asistente		\N	\N
271	12055106K	MARCO ANTONIO GODOY AVILA	Docente Asistente	DBKL60	\N	\N
272	90308785	MARCO ANTONIO LABARCA BAEZA	Docente Asistente		\N	\N
273	162106902	MARCOS CÉSAR ANTONIO GARAY HORMAZÁBAL	Docente Asociado	KSVB29	\N	\N
274	110030517	MARGARITA DE LAS MERCEDES ROJAS GALDAMES	Auxiliar de Servicios Generales		\N	\N
275	94501709	MARGARITA EUGENIA MADARIAGA FORTUZZI	Auxiliar de Seguridad		\N	\N
276	67538463	MARIA ELENA HURTADO OLIVARES	Docente Asistente		\N	\N
277	165705971	MARIA FRANCISCA CASTILLO GONZALEZ	Coordinador(a) de Carrera		\N	\N
278	180660240	MARIA JOSE TORO ROMERO	Docente Asistente	PPRK13	\N	\N
279	160414170	MARIA JOSE VASQUEZ MATTA	Docente Asistente		\N	\N
280	187490324	MARIA RAQUEL ZAMORANO CONTRERAS	Administrativo(a) de Personas		\N	\N
281	157935208	MARIA SOLEDAD JORQUERA PEÑA	Docente Asistente	LFTK31	\N	\N
282	80365357	MARIA SOLEDAD SOTO GUZMAN	Auxiliar de Servicios Generales		\N	\N
283	165713893	MARICEL TABITA CASTRO HERRERA	Coordinador(a) de Carrera	SWVT32	\N	\N
284	75786867	MARIO ADOLFO ARAVENA CASTILLO	Docente Asistente		\N	\N
285	158005980	MARIO ANDRES LOPEZ MUÑOZ	Docente Asistente	DKRT67	\N	\N
286	186694414	MARITZA ALEJANDRA SAN MARTIN DIAZ	Coordinador(a) de Laboratorio		\N	\N
287	129850043	MARLEN ANDREA CASTILLO CARRASCO	Contador(a)		\N	\N
288	167574548	MATIAS ENRIQUE BUSTOS AMPUERO	Docente Asistente		\N	\N
289	185301052	MATIAS EZEQUIEL ARRIOLA ARAVENA	Docente Asistente Inicial		\N	\N
290	129152575	MAURICIO ALEJANDRO CORONA CAROCA	Director(a) de Carreras de Informática y Telecomunicaciones	FKWV13	\N	\N
291	160066229	MAURICIO ARTURO CASTRO GARRIDO	Docente Asistente Inicial		\N	\N
292	16122393K	MAURICIO NICOLAS FIGUEROA VERDUGO	Docente Asistente Inicial		\N	\N
293	94788099	MAURO EDGARDO VILLARROEL LANDEROS	Docente Asistente Inicial	BKBD54	\N	\N
294	210023666	MAX AGUSTIN INOSTROZA SEREY	Docente Asistente Inicial		\N	\N
295	197644109	MAX ANDRÉS GÓMEZ FAÚNDES	Coordinador(a) de Carrera		\N	\N
296	153786909	MELISSA KAREN ARANEDA DIAZ	Docente Asociado	PSXS11	\N	\N
297	168756909	MERYAN SUSAN MIRANDA  SEGURA	Asistente de Extensión		\N	\N
298	189783027	MICHAEL BYRON CATALAN TEJO	Docente Asistente		\N	\N
299	181496983	MICHAEL STEVENS MUÑOZ IBACACHE	Docente Asistente Inicial		\N	\N
300	164478386	MICHEL FABRIZIO GUAJARDO SANCHEZ	Asistente Biblioteca		\N	\N
301	186636708	MIGUEL ANGEL ZAPATA PEREZ	Docente Asistente Inicial		\N	\N
302	154679871	MIGUEL ANTONIO MAULME JARA	Coordinador(a) de Laboratorio	TSJT32	\N	\N
303	241699307	MIGUEL JOSE NIÑO RIOS	Docente Asistente Inicial	KYYK91	\N	\N
304	212944920	MILLARAY ANTU  NAVARRETE  CASTRO	Pañolero		\N	\N
305	136871307	MONTSERRAT SALVAT LOPEZ	Docente Asistente		\N	\N
306	200850106	NADIA ESTER CORDOVA CANCINO	Docente Asistente	WA4455	\N	\N
307	161911666	NANCY CAROLINA ARAVENA MENA	Asistente de Financiamiento	HPHW16	\N	\N
308	201142369	NATALIA ELENA ESCOBAR ACUNA	Docente Asistente Inicial		\N	\N
309	16711766K	NATALIA PAZ CIFUENTES BARRERA	Docente Asistente	LZDR38	\N	\N
310	107347763	NELSON ESTEBAN PARRA MURUA	Docente Asistente Inicial		\N	\N
311	143681440	NESTOR ALEXIS ARAYA AGUILAR	Docente Asistente	RZCX10	\N	\N
312	163808307	NICKOL ABIGAIL QUINTANA OVIEDO	Docente Asistente		\N	\N
313	169033951	NICOLAS EDUARDO LOPEZ ROCHA	Especialista en Soporte TIC	GGHF90	\N	\N
314	183476181	NICOLAS IGNACIO NUÑEZ BRAVO	Docente Asistente Inicial	PCXR87	\N	\N
315	190579492	NICOLAS SAMUEL PATRICIO PLACENCIA SEPULVEDA	Docente Asistente Inicial	JWSZ72	\N	\N
316	185638294	NICOLE CAROLINA ESPINDOLA BRITO	Asistente Coordinación Docente		\N	\N
317	157733303	OLGA DEL CARMEN TAPIA CASTILLO	Docente Asistente	THFH92	\N	\N
318	155221682	OMAR CRISTOBAL LECAROS CARO	Docente Asistente	SHBP16	\N	\N
319	11268333K	OMAR ERNESTO SCHULZ MILLALONCO	Auxiliar de Seguridad		\N	\N
320	153123209	OSCAR ANDRE MERDECH CARVAJAL	Docente Asistente		\N	\N
321	115561642	OSCAR ANDRES NUÑEZ MADRID	Docente Asistente		\N	\N
322	107432582	OSCAR TOMAS MONTERO VASQUEZ	Pañolero		\N	\N
323	123570510	PABLO ANDRES SALAMANCA MARQUEZ	Docente Asistente	TZ1739	\N	\N
324	176018798	PABLO ENRIQUE ARELLANO HERRERA	Docente Asistente		\N	\N
325	194411073	PABLO ISAAC ARTEAGA HERNANDEZ	Docente Asistente Inicial	PDLG50	\N	\N
326	153319650	PAMELA CRISTINA VERGARA OGALDE	Director(a) de Carreras de Recursos Naturales	FFTW75	\N	\N
327	197854758	PAMELA FERNANDA CORREA RIOS	Coordinador(a) de Carrera		\N	\N
328	178500406	PATRICIA ALEJANDRA TORO TORRES	Docente Asistente		\N	\N
329	129029579	PATRICIA ANDREA MARABOLI MORALES	Pañolero		\N	\N
330	200419901	PATRICIA STEPHANIA  TAPIA  GARRIDO	Asistente de Financiamiento		\N	\N
331	81530637	PATRICIO REIMUNDO BARRIA ARAVENA	Capellán	GZFK25	\N	\N
332	130785654	PATRICK ESTEBAN GONZALEZ VARGAS	Director(a) de Carreras de Ingeniería	LLSB90	\N	\N
333	102411919	PAUL CHRISTIAN MAULEN PARDO	Docente Asistente		\N	\N
334	136786504	PAULA ANDREA  JAMASMIE  FERNANDEZ	Coordinador(a) de Admisión y Servicios al Postulante		\N	\N
335	16886955k	PAULA CAROLINA CANALES OFFEN	Subdirector(a) de Admisión, Comunicación y Extensión	HGVB57	\N	\N
336	158453886	PAULO ANDRES  MARCHANT HENRIQUEZ	Docente Asistente Inicial		\N	\N
337	129057920	PAVLOVA JOHANNA LIZANA ULLOA	Docente Asistente Inicial		\N	\N
338	189075006	PAZ CONSTANZA MORALES SAAVEDRA	Docente Asistente Inicial	LXKF35	\N	\N
339	124816432	PEDRO ANTONIO RIQUELME RIQUELME	Docente Asistente Inicial		\N	\N
340	79954276	PEDRO HERNAN TAMAYO RODRIGUEZ	Docente Asistente	RRKG50	\N	\N
341	187245818	PEDRO JESÚS  VALENCIA  MARTÍNEZ	Operador(a) de Soporte TIC	RF6621	\N	\N
342	154009795	PERLA BELEN SUAZO MONROS	Jefe Programa Inglés	JVGT64	\N	\N
343	160673427	PILAR DEL CARMEN BRAVO CAROCA	Docente Asistente	PCWP13	\N	\N
344	196351701	RAFAEL ALONSO BADILLO LUNA	Docente Asistente Inicial		\N	\N
345	166245427	RALSTON ALEXIS LAGOS SOLIS	Docente Asistente Inicial		\N	\N
346	168410824	RAMON IGNACIO FREIRE ORELLANA	Docente Asistente Inicial		\N	\N
347	05297545K	RAMON NELSON GONZALEZ LIZAMA	Docente Asistente		\N	\N
348	12642535K	RAQUEL ANDREA TEJOS LASTRA	Docente Asistente Inicial		\N	\N
349	164147118	RAUL ARTURO ESPINOZA CANTILLANA	Docente Asistente Inicial		\N	\N
350	139191188	RAUL RODRIGO ALLENDE VIELMA	Docente Asistente		\N	\N
351	167270867	RENATO IGNACIO BUSTAMANTE  GARCIA	Docente Asistente Inicial		\N	\N
352	120530410	RENE ANTONIO AVILA ROJAS	Docente Asistente	RRSW70	\N	\N
353	107050191	RENE MARIO BARRAZA PIZARRO	Coordinador(a) General Vespertino	JKLK95	\N	\N
354	166996945	RICARDO ANDRES CARO CARO	Coordinador(a) General de Desarrollo Estudiantil Vespertino		\N	\N
355	132964777	RICARDO ANTONIO AHUMADA CASTILLO	Docente Asistente	CFJH88	\N	\N
356	72431243	RICARDO ARTURO MIRANDA PUEBLA	Docente Asistente	GWHB86	\N	\N
357	199622633	RICARDO MAURICIO FIGUEROA MORALES	Docente Asistente Inicial		\N	\N
358	90027999	RICARDO MIGUEL ROJAS FLORES	Docente Asistente		\N	\N
359	99792345	RICARDO PATRICIO MARTINEZ ANABALON	Docente Asistente Inicial		\N	\N
360	72207270	RIDESVALDO OMAR AGUILERA NUÑEZ	Pañolero		\N	\N
361	153191069	RITA ORDEN VALLECILLO	Docente Asistente	JFFZ13	\N	\N
362	68988705	ROBERTO ESPINOZA TORRES	Auxiliar de Servicios Generales		\N	\N
363	174067570	ROBERTO JAVIER LUENGO BRANADA	Docente Asistente Inicial		\N	\N
364	188282555	RODOLFO ANDRES SILVA GUTIERREZ	Pañolero		\N	\N
365	133566864	RODRIGO ALEXANDER SOUZA ROSALES	Docente Asistente Inicial		\N	\N
366	150274826	RODRIGO ALONSO PEREZ DIAZ	Docente Asistente Inicial	FKWT28	\N	\N
367	11860203K	RODRIGO ALONSO SEPULVEDA CACERES	Subdirector(a) Académico(a)	LDXK93	\N	\N
368	175223053	RODRIGO ANDRES ALCAYAGA ABARCA	Docente Asistente		\N	\N
369	118431928	RODRIGO ANDRES MUÑOZ FERNANDEZ	Docente Asociado	PTBW36	\N	\N
370	174056048	RODRIGO JOSE ALVAREZ PERELLO	Docente Asistente Inicial		\N	\N
371	108445688	RODRIGO MANUEL LAZO CAMUS	Docente Asociado		\N	\N
372	85373781	ROGELIO PATRICIO VIDAL UTZ	Auxiliar de Seguridad	SDSL33	\N	\N
373	13704806K	ROGER ITALO SALAZAR SANDOVAL	Docente Asociado	PSDD18	\N	\N
374	165460588	ROMINA LISSETTE  FLORES CALDERON	Docente Asistente Inicial		\N	\N
375	19276677K	ROMINA NICOLE VILCHES DIAZ	Coordinador(a) de Desarrollo Laboral	JKJZ75	\N	\N
376	93055462	ROSA ELVIRA PEDRERO MACIAS	Auxiliar de Servicios Generales		\N	\N
377	163721775	ROSEL DENISSE CASTILLO RUBILAR	Docente Asistente	SRPX15	\N	\N
378	163758695	RUBEN DARIO SALAS TAPIA	Docente Asistente Inicial		\N	\N
379	125012515	RUTH DEL CARMEN CEA ARANGUIZ	Secretaria(o) Dirección	UW3443	\N	\N
380	120277847	RUTH ELISA VILLAGRAN MENDEZ	Secretaria(o) de Carrera	LLWB78	\N	\N
381	194425481	SAMMY ALEXANDER MARTINEZ GALVEZ	Docente Asistente Inicial		\N	\N
382	171904498	SAMUEL ALEXIS ASTETE MATURANA	Docente Asistente	PPKT88	\N	\N
383	181884924	SAMUEL ELEAZAR NOVOA SÁNCHEZ	Docente Asistente		\N	\N
384	189253176	SAMUEL HUGO CAÑETE ARAVENA	Docente Asistente Inicial	LXXV80	\N	\N
385	66472965	SAMUEL ISAAC VERA LAGOS	Docente Asistente		\N	\N
386	106979065	SANDRA DE LAS MERCEDES CATALAN JIMENEZ	Auxiliar de Servicios Generales		\N	\N
387	124588456	SANDRA ELIZABETH ORELLANA GUZMAN	Docente Asistente Inicial	GXPC34	\N	\N
388	123573919	SANDRA LISSETTE VEAS AGUILERA	Auxiliar de Servicios Generales		\N	\N
389	198295914	SATCHA BELEN QUISPE PARADA	Asistente Coordinación Docente		\N	\N
390	165250729	SAUL ELIAS AVILA BUSTOS	Coordinador(a) de Carrera		\N	\N
391	161535109	SCARLET MARLENE ESPINOZA FERNANDEZ	Jefe de Extensión		\N	\N
392	191146549	SEBASTIAN IGNACIO CARRIEL SILVA	Docente Asociado	DHCP83	\N	\N
393	166054966	SEBASTIAN IGNACIO TORRES VEGA	Docente Asistente	HJZD70	\N	\N
394	112255478	SERGIO ESTEBAN BULBOA VILCHES	Docente Asistente		\N	\N
395	180939768	SERGIO ESTEBAN ORTEGA BRAVO	Docente Asistente Inicial		\N	\N
396	121029480	SERGIO ORLANDO CHACANA ESPARZA	Docente Asistente	KRBV38	\N	\N
397	159171140	SILVIA ESTER MONTENEGRO DONOSO	Auxiliar de Seguridad		\N	\N
398	155890355	SOLANGE BEATRICE LIEMPI GOUGAIN	Docente Asistente Inicial	CBVH98	\N	\N
399	155798718	SUSANA EVELYN MUÑOZ SILVA	Asistente Biblioteca		\N	\N
400	139207424	SUSSY EVELYN MUÑOZ TOBAR	Docente Asociado	JKJS22	\N	\N
401	159314782	TAMARA ERLINDA SHUTTLETON CONTRERAS	Coordinador de Carrera		\N	\N
402	170543912	TAMARA VIOLETA  VOLKE  SARAVIA	Asistente Coordinación Docente		\N	\N
403	172834035	TEXIA CAROL DOMINGUEZ HIDALGO	Docente Asistente Inicial		\N	\N
404	177650730	THOMAS RODRIGO SOTO GUERRERO	Jefe(a) de Servicios Digitales	WC9873	\N	\N
405	185413381	TIARE CONSTANZA ESTAY SALAS	Docente Asistente Inicial		\N	\N
406	13905864K	VALENTIN ANDRES  LEON ROJAS	Docente Asistente Inicial		\N	\N
407	20205983K	VALENTINA ALEJANDRA GANGAS VASQUEZ	Asistente Coordinación Docente		\N	\N
408	200387422	VALENTINA MARGOT PINO SANDOVAL	Docente Asistente Inicial		\N	\N
409	166109671	VALERIA ANDREA BUSCAGLIA VASQUEZ	Director(a) de Carrera		\N	\N
410	125870538	VALESKA ALEJANDRA GAJARDO CARRION	Docente Asistente Inicial	HTZV71	\N	\N
411	141479784	VALESKA LEONOR JERIA BARRIGA	Subdirector Económico y de Gestión	GWPV53	\N	\N
412	195256381	VANESSA ALEXANDRA ZUÑIGA PEREZ	Director(a) de Carreras Informática y Telecomunicaciones	RJRF80	\N	\N
413	155352051	VANESSA DEL PILAR MENDOZA ACEVEDO	Jefe Administrativo	KWHK70	\N	\N
414	73480744	VERONICA DEL CARMEN GARRIDO JIMENEZ	Docente Asistente		\N	\N
415	141473433	VERÓNICA PAULINA  BERRÍOS  DEL SOLAR	Director(a) de Carreras de Construcción	CYLC95	\N	\N
416	151152619	VICENTE PATRICIO TORREALBA DIAZ	Docente Asistente	TJPH79	\N	\N
417	209423863	VICENTINA MILLARAY RAMIREZ CANIULLAN	Asesor(a) de Pastoral		\N	\N
418	189556241	VICTOR ALEJANDRO CACERES NOVA	Auxiliar de Servicios Generales		\N	\N
419	166585511	VICTOR FELIPE  MARAMBIO ROMERO	Docente Asistente Inicial		\N	\N
420	172497330	VÍCTOR OMAR ARANEDA SERRANO	Docente Titular		\N	\N
421	12239381K	VIVIANA FABIOLA VALDIVIA CONTRERAS	Director(a) de Carreras de Salud	JXFX65	\N	\N
422	160070005	VIVIANA LORENA MIRALLES HUENCHUN	Docente Asistente Adjunto DAE	DWLL66	\N	\N
423	18596728K	WILLIAMS ESTEBAN RIVAS TAPIA	Operador(a) DARA	KRFH35	\N	\N
424	177772747	YANINA KARINA  OLAVE  MONTENEGRO	Coordinador(a) de Carrera		\N	\N
425	181537124	YARELA JENNIFER VILLEGAS AMIGO	Docente Asistente Inicial		\N	\N
426	265423833	YNANIAS JESUS TOLEDO VASQUEZ	Docente Asistente Inicial	RHSL12	\N	\N
432	191723422	Guido Soto	Visita		\N	
433	152548654	Javiera Guzman	Visita	XGSD25	\N	Cetecom
\.


--
-- Data for Name: mapaestacionamiento_lugar; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.mapaestacionamiento_lugar (id, id_lugar, ocupado_por_id) FROM stdin;
173	E.47	\N
174	E.48	\N
175	E.49	\N
176	E.50	\N
177	E.51	\N
178	E.52	\N
179	E.53	\N
180	E.54	\N
181	E.55	\N
182	E.56	\N
183	E.57	\N
184	E.58	\N
186	E.60	\N
187	E.61	\N
189	E.63	\N
191	E.65	\N
192	E.66	\N
193	E.67	\N
194	E.68	\N
195	E.69	\N
196	E.70	\N
197	E.71	\N
198	E.72	\N
208	E.82	\N
207	E.81	\N
206	E.80	\N
205	E.79	\N
204	E.78	\N
203	E.77	\N
202	E.76	\N
281	E.7A	\N
329	E.92A	\N
330	E.92B	\N
327	E.91A	\N
328	E.91B	\N
325	E.90A	\N
326	E.90B	\N
323	E.89A	\N
324	E.89B	\N
321	E.88A	\N
322	E.88B	\N
319	E.87A	\N
320	E.87B	\N
317	E.86A	\N
315	E.85A	\N
316	E.85B	\N
313	E.84A	\N
314	E.84B	\N
289	E.11A	\N
318	E.86B	\N
188	E.62	\N
209	E.83	\N
131	E.5	\N
287	E.10A	\N
130	E.4	\N
201	E.75	\N
199	E.73	\N
279	E.6A	\N
280	E.6B	\N
282	E.7B	\N
283	E.8A	\N
284	E.8B	\N
285	E.9A	\N
286	E.9B	\N
288	E.10B	\N
290	E.11B	\N
292	E.12B	\N
291	E.12A	\N
294	E.13B	\N
293	E.13A	\N
296	E.14B	\N
295	E.14A	\N
298	E.15B	\N
297	E.15A	\N
300	E.16B	\N
299	E.16A	\N
302	E.17B	\N
301	E.17A	\N
304	E.18B	\N
303	E.18A	\N
305	E.19A	\N
306	E.19B	\N
307	E.20A	\N
308	E.20B	\N
309	E.21A	\N
310	E.21B	\N
312	E.22B	\N
311	E.22A	\N
149	E.23	\N
150	E.24	\N
151	E.25	\N
152	E.26	\N
153	E.27	\N
154	E.28	\N
155	E.29	\N
156	E.30	\N
157	E.31	\N
158	E.32	\N
159	E.33	\N
160	E.34	\N
161	E.35	\N
162	E.36	\N
163	E.37	\N
164	E.38	\N
165	E.39	\N
166	E.40	\N
167	E.41	\N
168	E.42	\N
169	E.43	\N
170	E.44	\N
171	E.45	\N
172	E.46	\N
129	E.3	\N
331	E.94A	\N
200	E.74	\N
190	E.64	\N
185	E.59	423
127	E.1	432
128	E.2	433
224	E.98	\N
223	E.97	\N
225	E.99	\N
226	E.100	\N
222	E.96	\N
221	E.95	\N
277	E.93A	\N
278	E.93B	\N
\.


--
-- Data for Name: mapaestacionamiento_registromovimiento; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.mapaestacionamiento_registromovimiento (id, fecha_ingreso, fecha_salida, funcionario_id, lugar_id, area, tipo_salida, liberado_por_id) FROM stdin;
173	2026-02-10 11:15:33.364055-03	2026-02-10 11:22:13.320107-03	31	187	True	NORMAL	\N
174	2026-02-10 11:22:35.163783-03	2026-02-10 11:22:53.268554-03	426	187	True	NORMAL	\N
175	2026-02-10 11:23:52.410363-03	2026-02-10 11:25:26.957431-03	426	187	True	NORMAL	\N
176	2026-02-10 11:25:39.208015-03	2026-02-10 11:25:52.066938-03	425	187	True	NORMAL	\N
177	2026-02-10 11:26:56.854693-03	2026-02-10 11:27:17.23613-03	424	188	True	NORMAL	\N
178	2026-02-10 11:30:11.72834-03	2026-02-10 11:30:18.930521-03	422	127	True	NORMAL	\N
179	2026-02-10 11:30:33.561486-03	2026-02-10 11:30:49.466879-03	422	127	True	NORMAL	\N
183	2026-02-10 11:41:13.4047-03	2026-02-10 11:41:25.951453-03	412	187	True	NORMAL	\N
182	2026-02-10 11:40:55.507817-03	2026-02-10 11:41:29.57307-03	413	188	True	NORMAL	\N
180	2026-02-10 11:39:46.070561-03	2026-02-10 11:41:40.051386-03	420	127	True	NORMAL	\N
181	2026-02-10 11:40:18.294026-03	2026-02-10 11:41:42.882183-03	419	189	True	NORMAL	\N
184	2026-02-10 11:46:37.740579-03	2026-02-10 11:47:02.695883-03	412	189	True	NORMAL	\N
186	2026-02-10 11:54:59.383914-03	2026-02-10 11:55:06.35797-03	416	127	True	NORMAL	\N
185	2026-02-10 11:47:28.730215-03	2026-02-10 11:55:07.83603-03	411	189	True	NORMAL	\N
187	2026-02-10 12:41:19.150968-03	2026-02-10 12:41:49.328521-03	416	189	True	NORMAL	\N
188	2026-02-10 12:51:12.168448-03	2026-02-10 12:51:46.004186-03	416	127	True	NORMAL	\N
189	2026-02-10 14:00:53.520536-03	2026-02-10 14:00:59.85358-03	341	188	True	NORMAL	\N
190	2026-02-10 14:42:24.594755-03	2026-02-10 14:42:29.847251-03	404	127	True	NORMAL	\N
191	2026-02-10 14:42:49.22659-03	2026-02-10 14:42:49.644511-03	403	127	True	NORMAL	\N
193	2026-02-10 14:43:31.735891-03	2026-02-10 14:43:40.210349-03	404	189	True	NORMAL	\N
192	2026-02-10 14:42:54.939326-03	2026-02-10 14:44:01.405889-03	403	127	True	NORMAL	\N
194	2026-02-10 18:09:38.205967-03	2026-02-10 18:10:23.443595-03	341	188	True	NORMAL	\N
195	2026-02-11 10:25:41.788205-03	2026-02-11 10:25:48.203357-03	404	187	True	NORMAL	\N
196	2026-02-11 10:26:30.640234-03	2026-02-11 10:27:38.588458-03	404	187	True	NORMAL	\N
197	2026-02-11 10:45:01.264927-03	2026-02-11 10:45:02.889078-03	426	187	True	NORMAL	\N
198	2026-02-11 10:45:25.01444-03	2026-02-11 10:45:26.034616-03	426	187	True	NORMAL	\N
200	2026-02-11 10:45:48.865751-03	2026-02-11 10:45:50.630928-03	425	188	True	NORMAL	\N
199	2026-02-11 10:45:34.67451-03	2026-02-11 10:45:52.313666-03	426	187	True	NORMAL	\N
201	2026-02-11 10:59:18.796932-03	2026-02-11 10:59:20.216378-03	425	187	True	NORMAL	\N
202	2026-02-11 11:01:39.561681-03	2026-02-11 11:20:29.243302-03	425	187	True	NORMAL	\N
203	2026-02-11 11:20:42.99631-03	2026-02-11 11:20:45.272131-03	425	187	True	NORMAL	\N
204	2026-02-11 11:20:55.37149-03	2026-02-11 11:31:56.953986-03	425	187	True	NORMAL	\N
205	2026-02-11 11:41:00.231404-03	2026-02-11 11:41:02.519562-03	425	187	True	NORMAL	\N
206	2026-02-11 11:41:23.258178-03	2026-02-11 11:41:39.401583-03	425	187	True	NORMAL	\N
207	2026-02-11 11:49:42.994106-03	2026-02-11 11:49:50.316629-03	425	127	True	NORMAL	\N
208	2026-02-11 12:05:52.555669-03	2026-02-11 12:06:07.161307-03	425	187	True	NORMAL	\N
209	2026-02-11 12:07:21.114161-03	2026-02-11 12:07:43.590662-03	421	187	True	NORMAL	\N
211	2026-02-11 12:18:52.683562-03	2026-02-11 12:19:04.775285-03	394	189	True	NORMAL	\N
210	2026-02-11 12:18:39.811086-03	2026-02-11 12:19:06.198973-03	396	127	True	NORMAL	\N
212	2026-02-11 12:47:48.773663-03	2026-02-11 12:49:11.74598-03	394	187	True	NORMAL	\N
214	2026-02-11 13:54:00.909593-03	2026-02-11 14:34:01.374093-03	356	127	True	NORMAL	\N
213	2026-02-11 12:50:03.675943-03	2026-02-11 14:34:21.93606-03	394	187	True	NORMAL	\N
215	2026-02-11 14:38:45.149936-03	2026-02-11 14:38:52.034861-03	341	127	True	NORMAL	\N
216	2026-02-11 14:39:02.775233-03	2026-02-11 14:47:07.547377-03	341	127	True	NORMAL	\N
217	2026-02-11 14:47:13.752432-03	2026-02-11 14:47:28.490571-03	341	127	True	NORMAL	\N
218	2026-02-11 14:47:49.241475-03	2026-02-11 14:54:17.704887-03	341	127	True	NORMAL	\N
219	2026-02-11 16:12:26.11506-03	2026-02-11 16:12:54.371574-03	356	188	True	NORMAL	\N
220	2026-02-11 17:42:12.446531-03	\N	425	188	True	NORMAL	\N
221	2026-02-11 18:03:53.713408-03	\N	341	187	True	NORMAL	\N
222	2026-02-12 12:05:38.697124-03	2026-02-12 12:14:39.54813-03	426	127	True	NORMAL	\N
224	2026-02-12 12:16:49.95158-03	2026-02-12 12:16:52.984408-03	424	128	True	NORMAL	\N
223	2026-02-12 12:16:24.601122-03	2026-02-12 12:17:27.296497-03	426	127	True	NORMAL	\N
225	2026-02-12 12:20:54.285321-03	2026-02-12 12:20:57.785093-03	424	127	True	NORMAL	\N
236	2026-02-12 14:33:42.104248-03	2026-02-12 16:10:31.731929-03	425	127	True	NORMAL	\N
227	2026-02-12 13:09:27.718351-03	\N	424	197	True	NORMAL	\N
230	2026-02-12 13:57:11.356119-03	\N	426	127	True	NORMAL	\N
231	2026-02-12 14:11:20.088176-03	2026-02-12 14:11:25.826312-03	417	317	True	NORMAL	\N
233	2026-02-12 14:11:45.769003-03	2026-02-12 14:31:21.267633-03	416	279	True	NORMAL	\N
228	2026-02-12 13:51:15.918669-03	2026-02-12 14:31:27.166161-03	419	277	True	NORMAL	\N
229	2026-02-12 13:51:46.907465-03	2026-02-12 14:31:31.285818-03	420	278	True	NORMAL	\N
232	2026-02-12 14:11:36.486716-03	2026-02-12 14:31:35.440876-03	417	317	True	NORMAL	\N
234	2026-02-12 14:12:02.209021-03	2026-02-12 14:31:39.349297-03	415	315	True	NORMAL	\N
235	2026-02-12 14:12:13.940825-03	2026-02-12 14:31:44.557448-03	414	316	True	NORMAL	\N
237	2026-02-12 14:34:14.884268-03	2026-02-12 16:10:32.663932-03	426	128	True	NORMAL	\N
238	2026-02-12 14:37:42.891025-03	2026-02-12 16:10:33.283621-03	423	129	True	NORMAL	\N
239	2026-02-12 14:37:50.032256-03	2026-02-12 16:10:33.655045-03	422	130	True	NORMAL	\N
240	2026-02-12 14:37:59.309014-03	2026-02-12 16:10:34.169196-03	421	131	True	NORMAL	\N
241	2026-02-12 14:38:08.36579-03	2026-02-12 16:10:45.367246-03	420	279	True	NORMAL	\N
242	2026-02-12 14:38:18.804907-03	2026-02-12 16:10:48.246638-03	419	280	True	NORMAL	\N
243	2026-02-12 14:38:42.542634-03	2026-02-12 16:10:51.060063-03	418	281	True	NORMAL	\N
244	2026-02-12 14:38:54.579456-03	2026-02-12 16:10:52.934521-03	417	282	True	NORMAL	\N
245	2026-02-12 14:39:07.559829-03	2026-02-12 16:10:55.963345-03	416	283	True	NORMAL	\N
246	2026-02-12 14:39:16.610481-03	2026-02-12 16:11:01.709707-03	415	284	True	NORMAL	\N
247	2026-02-12 14:39:26.822177-03	2026-02-12 16:11:04.766803-03	414	285	True	NORMAL	\N
248	2026-02-12 14:39:36.248643-03	2026-02-12 16:11:07.315289-03	413	286	True	NORMAL	\N
250	2026-02-12 14:40:38.817506-03	2026-02-12 16:11:11.807277-03	411	288	True	NORMAL	\N
249	2026-02-12 14:39:47.927649-03	2026-02-12 16:11:15.379331-03	412	287	True	NORMAL	\N
252	2026-02-12 14:41:54.002632-03	2026-02-12 16:11:18.970147-03	409	290	True	NORMAL	\N
251	2026-02-12 14:40:49.193919-03	2026-02-12 16:11:21.970718-03	410	289	True	NORMAL	\N
254	2026-02-12 14:42:10.775269-03	2026-02-12 16:11:26.63311-03	407	292	True	NORMAL	\N
253	2026-02-12 14:42:01.872613-03	2026-02-12 16:11:30.403144-03	408	291	True	NORMAL	\N
256	2026-02-12 14:42:26.882399-03	2026-02-12 16:11:34.191289-03	405	294	True	NORMAL	\N
255	2026-02-12 14:42:18.690561-03	2026-02-12 16:11:36.535594-03	406	293	True	NORMAL	\N
258	2026-02-12 14:42:42.533961-03	2026-02-12 16:11:39.419487-03	403	296	True	NORMAL	\N
257	2026-02-12 14:42:35.501204-03	2026-02-12 16:11:42.736692-03	404	295	True	NORMAL	\N
260	2026-02-12 14:42:59.54466-03	2026-02-12 16:11:46.028677-03	401	298	True	NORMAL	\N
259	2026-02-12 14:42:49.573082-03	2026-02-12 16:11:48.934339-03	402	297	True	NORMAL	\N
262	2026-02-12 14:43:16.753295-03	2026-02-12 16:11:51.852533-03	399	300	True	NORMAL	\N
261	2026-02-12 14:43:07.241719-03	2026-02-12 16:11:54.354907-03	400	299	True	NORMAL	\N
264	2026-02-12 14:43:33.537045-03	2026-02-12 16:11:58.17157-03	397	302	True	NORMAL	\N
263	2026-02-12 14:43:25.155291-03	2026-02-12 16:12:00.279146-03	398	301	True	NORMAL	\N
266	2026-02-12 14:43:53.079851-03	2026-02-12 16:12:03.008308-03	395	304	True	NORMAL	\N
265	2026-02-12 14:43:43.838256-03	2026-02-12 16:12:07.606221-03	396	303	True	NORMAL	\N
267	2026-02-12 14:44:07.475296-03	2026-02-12 16:12:11.492778-03	394	305	True	NORMAL	\N
268	2026-02-12 14:44:16.754598-03	2026-02-12 16:12:16.15284-03	393	306	True	NORMAL	\N
269	2026-02-12 14:44:24.637214-03	2026-02-12 16:12:19.952702-03	392	307	True	NORMAL	\N
270	2026-02-12 14:44:33.394636-03	2026-02-12 16:12:24.754459-03	391	308	True	NORMAL	\N
271	2026-02-12 14:44:43.324884-03	2026-02-12 16:12:27.014428-03	390	309	True	NORMAL	\N
272	2026-02-12 14:44:51.760282-03	2026-02-12 16:12:29.846097-03	389	310	True	NORMAL	\N
274	2026-02-12 14:45:11.786073-03	2026-02-12 16:12:37.01362-03	387	312	True	NORMAL	\N
273	2026-02-12 14:45:03.973128-03	2026-02-12 16:34:54.046603-03	388	311	True	NORMAL	\N
275	2026-02-12 14:45:24.411366-03	2026-02-12 16:34:57.259488-03	386	149	True	NORMAL	\N
276	2026-02-12 14:45:30.591108-03	2026-02-12 16:34:58.533593-03	385	150	True	NORMAL	\N
277	2026-02-12 14:49:18.287389-03	2026-02-12 16:34:59.269079-03	384	151	True	NORMAL	\N
278	2026-02-12 14:49:29.301272-03	2026-02-12 16:34:59.847539-03	383	152	True	NORMAL	\N
279	2026-02-12 14:49:36.36049-03	2026-02-12 16:35:00.491023-03	382	153	True	NORMAL	\N
280	2026-02-12 14:49:43.426117-03	2026-02-12 16:35:01.230789-03	381	154	True	NORMAL	\N
281	2026-02-12 14:49:49.740077-03	2026-02-12 16:35:01.634575-03	380	155	True	NORMAL	\N
282	2026-02-12 14:49:57.888439-03	2026-02-12 16:35:02.239478-03	379	156	True	NORMAL	\N
283	2026-02-12 14:50:06.548066-03	2026-02-12 16:35:02.66106-03	378	157	True	NORMAL	\N
284	2026-02-12 14:50:22.072159-03	2026-02-12 16:35:03.250881-03	377	158	True	NORMAL	\N
287	2026-02-12 14:50:52.942905-03	2026-02-12 16:35:04.397558-03	374	159	True	NORMAL	\N
288	2026-02-12 14:50:59.599599-03	2026-02-12 16:35:04.883353-03	373	160	True	NORMAL	\N
289	2026-02-12 14:51:05.111742-03	2026-02-12 16:35:05.436543-03	372	161	True	NORMAL	\N
290	2026-02-12 14:51:17.318037-03	2026-02-12 16:35:06.122585-03	371	162	True	NORMAL	\N
291	2026-02-12 14:51:24.609477-03	2026-02-12 16:35:06.788109-03	370	163	True	NORMAL	\N
292	2026-02-12 14:51:31.333128-03	2026-02-12 16:35:07.3411-03	369	164	True	NORMAL	\N
293	2026-02-12 14:51:38.367011-03	2026-02-12 16:35:07.883571-03	368	165	True	NORMAL	\N
294	2026-02-12 14:51:47.920511-03	2026-02-12 16:35:08.50457-03	367	166	True	NORMAL	\N
295	2026-02-12 14:51:56.456741-03	2026-02-12 16:35:09.050971-03	366	167	True	NORMAL	\N
296	2026-02-12 14:52:04.279674-03	2026-02-12 16:35:09.930205-03	365	168	True	NORMAL	\N
297	2026-02-12 14:52:11.410205-03	2026-02-12 16:35:10.381004-03	364	169	True	NORMAL	\N
286	2026-02-12 14:50:44.032779-03	2026-02-12 16:35:11.332016-03	375	170	True	NORMAL	\N
285	2026-02-12 14:50:30.351826-03	2026-02-12 16:35:11.924289-03	376	171	True	NORMAL	\N
298	2026-02-12 14:52:17.921709-03	2026-02-12 16:35:12.501551-03	363	172	True	NORMAL	\N
299	2026-02-12 14:52:26.472621-03	2026-02-12 16:35:13.316219-03	362	226	True	NORMAL	\N
300	2026-02-12 14:52:34.291545-03	2026-02-12 16:35:15.213398-03	361	173	True	NORMAL	\N
301	2026-02-12 14:52:41.440599-03	2026-02-12 16:35:15.817477-03	360	174	True	NORMAL	\N
302	2026-02-12 14:52:48.495835-03	2026-02-12 16:35:16.47614-03	359	175	True	NORMAL	\N
303	2026-02-12 14:52:56.140962-03	2026-02-12 16:35:17.447513-03	358	176	True	NORMAL	\N
304	2026-02-12 14:53:02.886586-03	2026-02-12 16:35:18.645406-03	357	177	True	NORMAL	\N
305	2026-02-12 14:53:13.229459-03	2026-02-12 16:35:19.572497-03	356	178	True	NORMAL	\N
306	2026-02-12 14:53:20.322852-03	2026-02-12 16:35:20.497495-03	355	179	True	NORMAL	\N
307	2026-02-12 14:53:26.61035-03	2026-02-12 16:35:21.232726-03	354	180	True	NORMAL	\N
308	2026-02-12 14:53:33.053809-03	2026-02-12 16:35:22.077351-03	353	181	True	NORMAL	\N
309	2026-02-12 14:53:40.052851-03	2026-02-12 16:35:22.71743-03	352	182	True	NORMAL	\N
310	2026-02-12 14:53:44.902346-03	2026-02-12 16:35:23.46853-03	351	183	True	NORMAL	\N
311	2026-02-12 14:53:51.470729-03	2026-02-12 16:35:24.218992-03	350	184	True	NORMAL	\N
312	2026-02-12 14:54:00.43215-03	2026-02-12 16:35:25.00568-03	349	185	True	NORMAL	\N
313	2026-02-12 14:54:07.593945-03	2026-02-12 16:35:25.661226-03	348	186	True	NORMAL	\N
314	2026-02-12 14:54:13.935298-03	2026-02-12 16:35:27.629538-03	347	187	True	NORMAL	\N
315	2026-02-12 14:54:25.038462-03	2026-02-12 16:35:28.394986-03	346	188	True	NORMAL	\N
316	2026-02-12 14:54:30.897207-03	2026-02-12 16:35:29.022423-03	345	189	True	NORMAL	\N
317	2026-02-12 14:54:36.322316-03	2026-02-12 16:35:29.635411-03	344	190	True	NORMAL	\N
318	2026-02-12 14:54:44.341179-03	2026-02-12 16:35:30.279469-03	343	191	True	NORMAL	\N
319	2026-02-12 14:54:50.217039-03	2026-02-12 16:35:30.844811-03	342	192	True	NORMAL	\N
320	2026-02-12 14:54:56.39559-03	2026-02-12 16:35:31.411509-03	341	193	True	NORMAL	\N
321	2026-02-12 14:55:02.324053-03	2026-02-12 16:35:32.020648-03	340	194	True	NORMAL	\N
322	2026-02-12 14:55:11.206711-03	2026-02-12 16:35:32.685755-03	339	195	True	NORMAL	\N
323	2026-02-12 14:55:18.138445-03	2026-02-12 16:35:33.350711-03	338	196	True	NORMAL	\N
324	2026-02-12 14:55:25.185802-03	2026-02-12 16:35:36.357563-03	337	197	True	NORMAL	\N
325	2026-02-12 14:55:33.554689-03	2026-02-12 16:35:37.292872-03	336	198	True	NORMAL	\N
326	2026-02-12 14:56:11.357712-03	2026-02-12 16:35:38.601471-03	334	199	True	NORMAL	\N
352	2026-02-12 15:01:12.764379-03	2026-02-12 16:35:39.845373-03	308	209	True	NORMAL	\N
353	2026-02-12 15:01:17.939894-03	2026-02-12 16:35:40.59521-03	307	208	True	NORMAL	\N
354	2026-02-12 15:01:24.311132-03	2026-02-12 16:35:41.158391-03	306	207	True	NORMAL	\N
355	2026-02-12 15:01:29.980873-03	2026-02-12 16:35:41.840917-03	305	206	True	NORMAL	\N
356	2026-02-12 15:01:36.070404-03	2026-02-12 16:35:43.63024-03	304	205	True	NORMAL	\N
357	2026-02-12 15:01:41.088334-03	2026-02-12 16:35:44.233618-03	303	204	True	NORMAL	\N
358	2026-02-12 15:01:45.507288-03	2026-02-12 16:35:44.765025-03	302	203	True	NORMAL	\N
359	2026-02-12 15:01:51.311884-03	2026-02-12 16:35:45.395607-03	301	202	True	NORMAL	\N
360	2026-02-12 15:01:57.991784-03	2026-02-12 16:35:46.116256-03	300	201	True	NORMAL	\N
327	2026-02-12 14:56:20.338351-03	2026-02-12 16:35:47.429161-03	333	225	True	NORMAL	\N
328	2026-02-12 14:57:39.244582-03	2026-02-12 16:35:47.979302-03	332	224	True	NORMAL	\N
329	2026-02-12 14:57:43.937086-03	2026-02-12 16:35:48.500408-03	331	223	True	NORMAL	\N
330	2026-02-12 14:57:49.584251-03	2026-02-12 16:35:49.159021-03	330	222	True	NORMAL	\N
331	2026-02-12 14:57:55.070951-03	2026-02-12 16:35:49.96409-03	329	221	True	NORMAL	\N
361	2026-02-12 16:09:44.274028-03	2026-02-12 16:35:53.648064-03	299	331	True	NORMAL	\N
332	2026-02-12 14:58:20.361423-03	2026-02-12 16:35:58.652657-03	328	277	True	NORMAL	\N
333	2026-02-12 14:58:35.451115-03	2026-02-12 16:36:08.661872-03	327	278	True	NORMAL	\N
334	2026-02-12 14:58:47.620856-03	2026-02-12 16:36:11.267469-03	326	329	True	NORMAL	\N
335	2026-02-12 14:58:54.985184-03	2026-02-12 16:36:13.701028-03	325	330	True	NORMAL	\N
336	2026-02-12 14:59:01.239956-03	2026-02-12 16:36:16.85953-03	324	327	True	NORMAL	\N
337	2026-02-12 14:59:08.623688-03	2026-02-12 16:36:19.96896-03	323	328	True	NORMAL	\N
338	2026-02-12 14:59:16.391998-03	2026-02-12 16:36:22.284538-03	322	325	True	NORMAL	\N
339	2026-02-12 14:59:22.757513-03	2026-02-12 16:36:24.941758-03	321	326	True	NORMAL	\N
340	2026-02-12 14:59:30.588038-03	2026-02-12 16:36:27.707566-03	320	323	True	NORMAL	\N
341	2026-02-12 14:59:42.624-03	2026-02-12 16:36:29.980602-03	319	324	True	NORMAL	\N
342	2026-02-12 14:59:52.020587-03	2026-02-12 16:36:32.787405-03	318	321	True	NORMAL	\N
343	2026-02-12 14:59:58.776019-03	2026-02-12 16:36:34.95383-03	317	322	True	NORMAL	\N
344	2026-02-12 15:00:09.73531-03	2026-02-12 16:36:36.827461-03	316	319	True	NORMAL	\N
345	2026-02-12 15:00:16.991317-03	2026-02-12 16:36:40.753669-03	315	320	True	NORMAL	\N
346	2026-02-12 15:00:23.735952-03	2026-02-12 16:36:43.274948-03	314	317	True	NORMAL	\N
347	2026-02-12 15:00:30.971082-03	2026-02-12 16:36:46.296876-03	313	318	True	NORMAL	\N
348	2026-02-12 15:00:37.469126-03	2026-02-12 16:36:50.000343-03	312	315	True	NORMAL	\N
349	2026-02-12 15:00:43.968253-03	2026-02-12 16:36:52.511114-03	311	316	True	NORMAL	\N
350	2026-02-12 15:00:57.022669-03	2026-02-12 16:36:54.494885-03	310	313	True	NORMAL	\N
351	2026-02-12 15:01:03.657804-03	2026-02-12 16:36:56.535412-03	309	314	True	NORMAL	\N
366	2026-02-12 17:58:24.532072-03	2026-02-12 17:58:39.345927-03	414	128	True	NORMAL	\N
367	2026-02-12 17:58:48.050745-03	2026-02-12 17:59:04.144677-03	414	128	True	NORMAL	\N
363	2026-02-12 17:36:06.734858-03	2026-02-12 18:06:10.714515-03	421	127	True	NORMAL	\N
362	2026-02-12 17:02:10.779823-03	2026-02-12 18:08:03.161899-03	420	287	True	NORMAL	\N
364	2026-02-12 17:42:12.299003-03	2026-02-12 18:08:06.86244-03	418	289	True	NORMAL	\N
365	2026-02-12 17:42:32.979439-03	2026-02-13 13:22:50.766128-03	417	318	True	NORMAL	\N
368	2026-02-12 17:59:15.210621-03	2026-02-12 18:05:44.745219-03	414	128	True	NORMAL	\N
370	2026-02-12 18:04:51.641018-03	2026-02-12 18:05:51.454565-03	402	201	True	NORMAL	\N
371	2026-02-12 18:05:53.808593-03	2026-02-12 18:06:07.884556-03	402	128	True	NORMAL	\N
373	2026-02-12 18:07:39.840278-03	2026-02-12 18:07:47.169366-03	399	281	True	NORMAL	\N
369	2026-02-12 18:03:09.836964-03	2026-02-12 18:07:57.849724-03	400	129	True	NORMAL	\N
372	2026-02-12 18:06:13.687649-03	2026-02-12 18:08:00.970054-03	402	127	True	NORMAL	\N
374	2026-02-13 13:11:28.50898-03	2026-02-13 13:11:49.18987-03	422	127	True	NORMAL	\N
375	2026-02-13 13:11:54.859304-03	2026-02-13 13:13:39.1696-03	422	127	True	NORMAL	\N
376	2026-02-13 13:13:43.188215-03	2026-02-13 13:14:19.852512-03	422	129	True	NORMAL	\N
377	2026-02-13 13:14:21.721548-03	2026-02-13 13:16:48.260997-03	422	127	True	NORMAL	\N
378	2026-02-13 13:17:33.721186-03	2026-02-13 13:20:59.166446-03	422	127	True	NORMAL	\N
379	2026-02-13 13:21:06.232594-03	2026-02-13 13:21:08.680647-03	422	127	True	NORMAL	\N
384	2026-02-16 13:23:15.799277-03	2026-02-16 13:23:17.754063-03	6	127	True	NORMAL	\N
387	2026-02-16 16:53:51.57894-03	2026-02-16 16:54:24.298446-03	404	188	True	NORMAL	\N
388	2026-02-16 16:59:53.13698-03	2026-02-16 18:15:16.181679-03	404	190	True	NORMAL	\N
395	2026-02-18 12:13:14.892103-03	2026-02-18 12:13:36.853529-03	404	127	\N	MANUAL	13
396	2026-02-18 12:14:35.597735-03	2026-02-18 12:14:41.120604-03	422	130	\N	NORMAL	\N
398	2026-02-18 14:21:39.361173-03	2026-02-18 16:57:09.156476-03	362	127	\N	MANUAL	13
399	2026-02-18 14:22:30.809063-03	2026-02-18 16:57:19.241377-03	343	129	\N	NORMAL	\N
397	2026-02-18 13:38:45.876127-03	2026-02-18 16:57:27.899574-03	418	331	\N	NORMAL	\N
400	2026-02-18 17:06:16.765818-03	2026-02-18 17:28:34.042117-03	332	128	\N	NORMAL	\N
403	2026-02-18 17:47:32.190767-03	2026-02-18 17:48:00.755763-03	404	190	\N	NORMAL	\N
401	2026-02-18 17:28:50.546492-03	2026-02-19 11:35:26.566231-03	422	127	\N	NORMAL	\N
402	2026-02-18 17:42:28.158569-03	2026-02-19 11:35:27.422351-03	400	128	\N	NORMAL	\N
404	2026-02-19 11:44:30.726173-03	2026-02-19 12:25:45.532774-03	404	225	\N	NORMAL	\N
405	2026-02-19 12:27:10.405658-03	\N	423	185	\N	\N	\N
406	2026-02-19 13:05:03.067069-03	\N	432	127	\N	\N	\N
407	2026-02-19 13:15:02.509186-03	\N	433	128	\N	\N	\N
\.


--
-- Name: administracion_configuracionsistema_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.administracion_configuracionsistema_id_seq', 1, false);


--
-- Name: auth_group_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.auth_group_id_seq', 7, true);


--
-- Name: auth_group_permissions_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.auth_group_permissions_id_seq', 1, true);


--
-- Name: auth_permission_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.auth_permission_id_seq', 44, true);


--
-- Name: auth_user_groups_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.auth_user_groups_id_seq', 17, true);


--
-- Name: auth_user_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.auth_user_id_seq', 20, true);


--
-- Name: auth_user_user_permissions_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.auth_user_user_permissions_id_seq', 1, false);


--
-- Name: django_admin_log_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.django_admin_log_id_seq', 10, true);


--
-- Name: django_content_type_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.django_content_type_id_seq', 11, true);


--
-- Name: django_migrations_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.django_migrations_id_seq', 32, true);


--
-- Name: funcionarios_funcionario_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.funcionarios_funcionario_id_seq', 433, true);


--
-- Name: mapaestacionamiento_lugar_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.mapaestacionamiento_lugar_id_seq', 331, true);


--
-- Name: mapaestacionamiento_registromovimiento_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.mapaestacionamiento_registromovimiento_id_seq', 407, true);


--
-- Name: administracion_configuracionsistema administracion_configuracionsistema_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.administracion_configuracionsistema
    ADD CONSTRAINT administracion_configuracionsistema_pkey PRIMARY KEY (id);


--
-- Name: auth_group auth_group_name_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.auth_group
    ADD CONSTRAINT auth_group_name_key UNIQUE (name);


--
-- Name: auth_group_permissions auth_group_permissions_group_id_permission_id_0cd325b0_uniq; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.auth_group_permissions
    ADD CONSTRAINT auth_group_permissions_group_id_permission_id_0cd325b0_uniq UNIQUE (group_id, permission_id);


--
-- Name: auth_group_permissions auth_group_permissions_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.auth_group_permissions
    ADD CONSTRAINT auth_group_permissions_pkey PRIMARY KEY (id);


--
-- Name: auth_group auth_group_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.auth_group
    ADD CONSTRAINT auth_group_pkey PRIMARY KEY (id);


--
-- Name: auth_permission auth_permission_content_type_id_codename_01ab375a_uniq; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.auth_permission
    ADD CONSTRAINT auth_permission_content_type_id_codename_01ab375a_uniq UNIQUE (content_type_id, codename);


--
-- Name: auth_permission auth_permission_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.auth_permission
    ADD CONSTRAINT auth_permission_pkey PRIMARY KEY (id);


--
-- Name: auth_user_groups auth_user_groups_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.auth_user_groups
    ADD CONSTRAINT auth_user_groups_pkey PRIMARY KEY (id);


--
-- Name: auth_user_groups auth_user_groups_user_id_group_id_94350c0c_uniq; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.auth_user_groups
    ADD CONSTRAINT auth_user_groups_user_id_group_id_94350c0c_uniq UNIQUE (user_id, group_id);


--
-- Name: auth_user auth_user_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.auth_user
    ADD CONSTRAINT auth_user_pkey PRIMARY KEY (id);


--
-- Name: auth_user_user_permissions auth_user_user_permissions_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.auth_user_user_permissions
    ADD CONSTRAINT auth_user_user_permissions_pkey PRIMARY KEY (id);


--
-- Name: auth_user_user_permissions auth_user_user_permissions_user_id_permission_id_14a6b632_uniq; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.auth_user_user_permissions
    ADD CONSTRAINT auth_user_user_permissions_user_id_permission_id_14a6b632_uniq UNIQUE (user_id, permission_id);


--
-- Name: auth_user auth_user_username_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.auth_user
    ADD CONSTRAINT auth_user_username_key UNIQUE (username);


--
-- Name: django_admin_log django_admin_log_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.django_admin_log
    ADD CONSTRAINT django_admin_log_pkey PRIMARY KEY (id);


--
-- Name: django_content_type django_content_type_app_label_model_76bd3d3b_uniq; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.django_content_type
    ADD CONSTRAINT django_content_type_app_label_model_76bd3d3b_uniq UNIQUE (app_label, model);


--
-- Name: django_content_type django_content_type_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.django_content_type
    ADD CONSTRAINT django_content_type_pkey PRIMARY KEY (id);


--
-- Name: django_migrations django_migrations_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.django_migrations
    ADD CONSTRAINT django_migrations_pkey PRIMARY KEY (id);


--
-- Name: django_session django_session_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.django_session
    ADD CONSTRAINT django_session_pkey PRIMARY KEY (session_key);


--
-- Name: funcionarios_funcionario funcionarios_funcionario_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.funcionarios_funcionario
    ADD CONSTRAINT funcionarios_funcionario_pkey PRIMARY KEY (id);


--
-- Name: funcionarios_funcionario funcionarios_funcionario_rut_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.funcionarios_funcionario
    ADD CONSTRAINT funcionarios_funcionario_rut_key UNIQUE (rut);


--
-- Name: funcionarios_funcionario funcionarios_funcionario_usuario_sistema_id_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.funcionarios_funcionario
    ADD CONSTRAINT funcionarios_funcionario_usuario_sistema_id_key UNIQUE (usuario_sistema_id);


--
-- Name: mapaestacionamiento_lugar mapaestacionamiento_lugar_id_lugar_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.mapaestacionamiento_lugar
    ADD CONSTRAINT mapaestacionamiento_lugar_id_lugar_key UNIQUE (id_lugar);


--
-- Name: mapaestacionamiento_lugar mapaestacionamiento_lugar_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.mapaestacionamiento_lugar
    ADD CONSTRAINT mapaestacionamiento_lugar_pkey PRIMARY KEY (id);


--
-- Name: mapaestacionamiento_registromovimiento mapaestacionamiento_registromovimiento_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.mapaestacionamiento_registromovimiento
    ADD CONSTRAINT mapaestacionamiento_registromovimiento_pkey PRIMARY KEY (id);


--
-- Name: auth_group_name_a6ea08ec_like; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX auth_group_name_a6ea08ec_like ON public.auth_group USING btree (name varchar_pattern_ops);


--
-- Name: auth_group_permissions_group_id_b120cbf9; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX auth_group_permissions_group_id_b120cbf9 ON public.auth_group_permissions USING btree (group_id);


--
-- Name: auth_group_permissions_permission_id_84c5c92e; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX auth_group_permissions_permission_id_84c5c92e ON public.auth_group_permissions USING btree (permission_id);


--
-- Name: auth_permission_content_type_id_2f476e4b; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX auth_permission_content_type_id_2f476e4b ON public.auth_permission USING btree (content_type_id);


--
-- Name: auth_user_groups_group_id_97559544; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX auth_user_groups_group_id_97559544 ON public.auth_user_groups USING btree (group_id);


--
-- Name: auth_user_groups_user_id_6a12ed8b; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX auth_user_groups_user_id_6a12ed8b ON public.auth_user_groups USING btree (user_id);


--
-- Name: auth_user_user_permissions_permission_id_1fbb5f2c; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX auth_user_user_permissions_permission_id_1fbb5f2c ON public.auth_user_user_permissions USING btree (permission_id);


--
-- Name: auth_user_user_permissions_user_id_a95ead1b; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX auth_user_user_permissions_user_id_a95ead1b ON public.auth_user_user_permissions USING btree (user_id);


--
-- Name: auth_user_username_6821ab7c_like; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX auth_user_username_6821ab7c_like ON public.auth_user USING btree (username varchar_pattern_ops);


--
-- Name: django_admin_log_content_type_id_c4bce8eb; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX django_admin_log_content_type_id_c4bce8eb ON public.django_admin_log USING btree (content_type_id);


--
-- Name: django_admin_log_user_id_c564eba6; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX django_admin_log_user_id_c564eba6 ON public.django_admin_log USING btree (user_id);


--
-- Name: django_session_expire_date_a5c62663; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX django_session_expire_date_a5c62663 ON public.django_session USING btree (expire_date);


--
-- Name: django_session_session_key_c0390e0f_like; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX django_session_session_key_c0390e0f_like ON public.django_session USING btree (session_key varchar_pattern_ops);


--
-- Name: funcionarios_funcionario_rut_ff89afaf_like; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX funcionarios_funcionario_rut_ff89afaf_like ON public.funcionarios_funcionario USING btree (rut varchar_pattern_ops);


--
-- Name: mapaestacionamiento_lugar_id_lugar_d80a6694_like; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX mapaestacionamiento_lugar_id_lugar_d80a6694_like ON public.mapaestacionamiento_lugar USING btree (id_lugar varchar_pattern_ops);


--
-- Name: mapaestacionamiento_lugar_ocupado_por_id_c02a52e1; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX mapaestacionamiento_lugar_ocupado_por_id_c02a52e1 ON public.mapaestacionamiento_lugar USING btree (ocupado_por_id);


--
-- Name: mapaestacionamiento_registromovimiento_funcionario_id_1f7c8d8a; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX mapaestacionamiento_registromovimiento_funcionario_id_1f7c8d8a ON public.mapaestacionamiento_registromovimiento USING btree (funcionario_id);


--
-- Name: mapaestacionamiento_registromovimiento_liberado_por_id_0f7b4512; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX mapaestacionamiento_registromovimiento_liberado_por_id_0f7b4512 ON public.mapaestacionamiento_registromovimiento USING btree (liberado_por_id);


--
-- Name: mapaestacionamiento_registromovimiento_lugar_id_0731bcbd; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX mapaestacionamiento_registromovimiento_lugar_id_0731bcbd ON public.mapaestacionamiento_registromovimiento USING btree (lugar_id);


--
-- Name: auth_group_permissions auth_group_permissio_permission_id_84c5c92e_fk_auth_perm; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.auth_group_permissions
    ADD CONSTRAINT auth_group_permissio_permission_id_84c5c92e_fk_auth_perm FOREIGN KEY (permission_id) REFERENCES public.auth_permission(id) DEFERRABLE INITIALLY DEFERRED;


--
-- Name: auth_group_permissions auth_group_permissions_group_id_b120cbf9_fk_auth_group_id; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.auth_group_permissions
    ADD CONSTRAINT auth_group_permissions_group_id_b120cbf9_fk_auth_group_id FOREIGN KEY (group_id) REFERENCES public.auth_group(id) DEFERRABLE INITIALLY DEFERRED;


--
-- Name: auth_permission auth_permission_content_type_id_2f476e4b_fk_django_co; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.auth_permission
    ADD CONSTRAINT auth_permission_content_type_id_2f476e4b_fk_django_co FOREIGN KEY (content_type_id) REFERENCES public.django_content_type(id) DEFERRABLE INITIALLY DEFERRED;


--
-- Name: auth_user_groups auth_user_groups_group_id_97559544_fk_auth_group_id; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.auth_user_groups
    ADD CONSTRAINT auth_user_groups_group_id_97559544_fk_auth_group_id FOREIGN KEY (group_id) REFERENCES public.auth_group(id) DEFERRABLE INITIALLY DEFERRED;


--
-- Name: auth_user_groups auth_user_groups_user_id_6a12ed8b_fk_auth_user_id; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.auth_user_groups
    ADD CONSTRAINT auth_user_groups_user_id_6a12ed8b_fk_auth_user_id FOREIGN KEY (user_id) REFERENCES public.auth_user(id) DEFERRABLE INITIALLY DEFERRED;


--
-- Name: auth_user_user_permissions auth_user_user_permi_permission_id_1fbb5f2c_fk_auth_perm; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.auth_user_user_permissions
    ADD CONSTRAINT auth_user_user_permi_permission_id_1fbb5f2c_fk_auth_perm FOREIGN KEY (permission_id) REFERENCES public.auth_permission(id) DEFERRABLE INITIALLY DEFERRED;


--
-- Name: auth_user_user_permissions auth_user_user_permissions_user_id_a95ead1b_fk_auth_user_id; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.auth_user_user_permissions
    ADD CONSTRAINT auth_user_user_permissions_user_id_a95ead1b_fk_auth_user_id FOREIGN KEY (user_id) REFERENCES public.auth_user(id) DEFERRABLE INITIALLY DEFERRED;


--
-- Name: django_admin_log django_admin_log_content_type_id_c4bce8eb_fk_django_co; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.django_admin_log
    ADD CONSTRAINT django_admin_log_content_type_id_c4bce8eb_fk_django_co FOREIGN KEY (content_type_id) REFERENCES public.django_content_type(id) DEFERRABLE INITIALLY DEFERRED;


--
-- Name: django_admin_log django_admin_log_user_id_c564eba6_fk_auth_user_id; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.django_admin_log
    ADD CONSTRAINT django_admin_log_user_id_c564eba6_fk_auth_user_id FOREIGN KEY (user_id) REFERENCES public.auth_user(id) DEFERRABLE INITIALLY DEFERRED;


--
-- Name: funcionarios_funcionario funcionarios_funcion_usuario_sistema_id_2c3e6919_fk_auth_user; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.funcionarios_funcionario
    ADD CONSTRAINT funcionarios_funcion_usuario_sistema_id_2c3e6919_fk_auth_user FOREIGN KEY (usuario_sistema_id) REFERENCES public.auth_user(id) DEFERRABLE INITIALLY DEFERRED;


--
-- Name: mapaestacionamiento_registromovimiento mapaestacionamiento__funcionario_id_1f7c8d8a_fk_funcionar; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.mapaestacionamiento_registromovimiento
    ADD CONSTRAINT mapaestacionamiento__funcionario_id_1f7c8d8a_fk_funcionar FOREIGN KEY (funcionario_id) REFERENCES public.funcionarios_funcionario(id) DEFERRABLE INITIALLY DEFERRED;


--
-- Name: mapaestacionamiento_registromovimiento mapaestacionamiento__liberado_por_id_0f7b4512_fk_auth_user; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.mapaestacionamiento_registromovimiento
    ADD CONSTRAINT mapaestacionamiento__liberado_por_id_0f7b4512_fk_auth_user FOREIGN KEY (liberado_por_id) REFERENCES public.auth_user(id) DEFERRABLE INITIALLY DEFERRED;


--
-- Name: mapaestacionamiento_registromovimiento mapaestacionamiento__lugar_id_0731bcbd_fk_mapaestac; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.mapaestacionamiento_registromovimiento
    ADD CONSTRAINT mapaestacionamiento__lugar_id_0731bcbd_fk_mapaestac FOREIGN KEY (lugar_id) REFERENCES public.mapaestacionamiento_lugar(id) DEFERRABLE INITIALLY DEFERRED;


--
-- Name: mapaestacionamiento_lugar mapaestacionamiento__ocupado_por_id_c02a52e1_fk_funcionar; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.mapaestacionamiento_lugar
    ADD CONSTRAINT mapaestacionamiento__ocupado_por_id_c02a52e1_fk_funcionar FOREIGN KEY (ocupado_por_id) REFERENCES public.funcionarios_funcionario(id) DEFERRABLE INITIALLY DEFERRED;


--
-- PostgreSQL database dump complete
--

\unrestrict eFrZkk3xPbEstAK788u8dyRbAIUI3WqaRIhoN1bowwlVNlbJY9uTaYeezOXl0cX

