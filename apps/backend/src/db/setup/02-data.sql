-- Dummy data
INSERT INTO "public"."learning_resource_type"
            ("name",
             "description")
VALUES      ('Digital Learning',
             'Online learning'),
            ('Classroom',
             'In person classroom training'),
            ('Virtual Classroom',
             'Online classroom training'); 

INSERT INTO "public"."learning_resource"
            ("type_id",
             "name",
             "url",
             "description",
             "deadline_at",
             "is_mandatory",
             "created_at")
VALUES      ('2',
             'Ethics, Integrity and Sexual Harassment Training',
             'www.abc.com',
             'Classroom type training',
             '2024-12-31 15:55:00+00',
             'true',
             ( Now() AT TIME zone 'utc' :: text )),
            ('1',
             'DCPDC Privacy Policy 2024',
             'www.abc.com',
             'Online video',
             '2024-12-31 04:55:00+00',
             'true',
             ( Now() AT TIME zone 'utc' :: text )),
            ('1',
             '2024 Global Anti-Corruption and Financial Crime Compliance Refresher',
             'www.abc.com',
             'Online video',
             '2024-12-31 04:55:00+00',
             'true',
             ( Now() AT TIME zone 'utc' :: text )),
            ('3',
             'Next.js Conference',
             'www.abc.com',
             'Online conference',
             NULL,
             'false',
             ( Now() AT TIME zone 'utc' :: text )); 

INSERT INTO "public"."learning_status"
            ("name",
             "description")
VALUES      ('Not Started',
             'User has not not started the learning resource.'),
            ('In Progress',
             'User has started the learning resource but has not completed it yet.'),
            ('Completed',
             'User has completed the learning resource.'); 

INSERT INTO "public"."user_role"
            ("name",
             "description")
VALUES      ('Manager',
             'Lead role'),
            ('Individual Contributor',
             'IC Role'); 

INSERT INTO "public"."user"
            ("role_id",
             "first_name",
             "last_name",
             "email",
             "is_active")
VALUES      ('1',
             'Marvin',
             'Martian',
             'martian@mars.com',
             'true'); 

INSERT INTO "public"."assigned_learning_resource"
            (
             "user_id",
             "resource_id",
             "status_id",
             "started_at",
             "completed_at",
             "modified_at",
             "created_at")
VALUES      (
             '1',
             '1',
             '1',
             NULL,
             NULL,
             NULL,
             (now() AT TIME ZONE 'utc'::text)),
            (
             '1',
             '2',
             '1',
             NULL,
             NULL,
             NULL,
             (now() AT TIME ZONE 'utc'::text)),
            (
             '1',
             '3',
             '1',
             NULL,
             NULL,
             NULL,
             (now() AT TIME ZONE 'utc'::text)),
            (
             '1',
             '4',
             '1',
             NULL,
             NULL,
             NULL,
             (now() AT TIME ZONE 'utc'::text)); 
