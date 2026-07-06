import { Question } from '../types';
import { domain1Questions } from './domain1';
import { domain1bQuestions } from './domain1b';
import { domain1cQuestions } from './domain1c';
import { domain1scQuestions } from './domain1sc';
import { domain1sc2Questions } from './domain1sc2';
import { domain2Questions } from './domain2';
import { domain2bQuestions } from './domain2b';
import { domain2cQuestions } from './domain2c';
import { domain2scQuestions } from './domain2sc';
import { domain2sc2Questions } from './domain2sc2';
import { domain3Questions } from './domain3';
import { domain3bQuestions } from './domain3b';
import { domain3cQuestions } from './domain3c';
import { domain3dQuestions } from './domain3d';
import { domain3eQuestions } from './domain3e';
import { domain3fQuestions } from './domain3f';
import { domain3gQuestions } from './domain3g';
import { domain3scQuestions } from './domain3sc';
import { domain3sc2Questions } from './domain3sc2';
import { domain4Questions } from './domain4';
import { domain4bQuestions } from './domain4b';
import { domain4cQuestions } from './domain4c';
import { domain4dQuestions } from './domain4d';
import { domain4eQuestions } from './domain4e';
import { domain4fQuestions } from './domain4f';
import { domain4scQuestions } from './domain4sc';
import { domain4sc2Questions } from './domain4sc2';
import { domain5Questions } from './domain5';
import { domain5bQuestions } from './domain5b';
import { domain5cQuestions } from './domain5c';
import { domain5dQuestions } from './domain5d';
import { domain5eQuestions } from './domain5e';
import { domain5fQuestions } from './domain5f';
import { domain5gQuestions } from './domain5g';
import { domain5scQuestions } from './domain5sc';
import { domain5sc2Questions } from './domain5sc2';
import { domain6Questions } from './domain6';
import { domain6bQuestions } from './domain6b';
import { domain6cQuestions } from './domain6c';
import { domain6dQuestions } from './domain6d';
import { domain6eQuestions } from './domain6e';
import { domain6fQuestions } from './domain6f';
import { domain6scQuestions } from './domain6sc';
import { domain6sc2Questions } from './domain6sc2';
import { domain7Questions } from './domain7';
import { domain7bQuestions } from './domain7b';
import { domain7cQuestions } from './domain7c';
import { domain7dQuestions } from './domain7d';
import { domain7eQuestions } from './domain7e';
import { domain7fQuestions } from './domain7f';
import { domain7scQuestions } from './domain7sc';
import { domain7sc2Questions } from './domain7sc2';
import { domain8Questions } from './domain8';
import { domain8bQuestions } from './domain8b';
import { domain8cQuestions } from './domain8c';
import { domain8dQuestions } from './domain8d';
import { domain8eQuestions } from './domain8e';
import { domain8scQuestions } from './domain8sc';
import { domain8sc2Questions } from './domain8sc2';
import { domain9Questions } from './domain9';
import { domain9bQuestions } from './domain9b';
import { domain9cQuestions } from './domain9c';
import { domain9dQuestions } from './domain9d';
import { domain9scQuestions } from './domain9sc';
import { domain9sc2Questions } from './domain9sc2';
import { domain10Questions } from './domain10';
import { domain10bQuestions } from './domain10b';
import { domain10cQuestions } from './domain10c';
import { domain10dQuestions } from './domain10d';
import { domain10scQuestions } from './domain10sc';
import { domain10sc2Questions } from './domain10sc2';
import { domain1PrepartoQuestions } from './domain1_preparto';
import { domain2PrepartoQuestions } from './domain2_preparto';
import { domain3PrepartoQuestions } from './domain3_preparto';
import { domain4PrepartoQuestions } from './domain4_preparto';
import { domain5PrepartoQuestions } from './domain5_preparto';
import { domain6PrepartoQuestions } from './domain6_preparto';
import { domain7PrepartoQuestions } from './domain7_preparto';
import { domain8PrepartoQuestions } from './domain8_preparto';
import { domain9PrepartoQuestions } from './domain9_preparto';
import { domain10PrepartoQuestions } from './domain10_preparto';
import { domain1ExamQuestions } from './domain1_exam';
import { domain2ExamQuestions } from './domain2_exam';
import { domain3ExamQuestions } from './domain3_exam';
import { domain4ExamQuestions } from './domain4_exam';
import { flaggedQuestions } from './flagged';
import { STUDY_GUIDE_QUESTIONS as BASE_STUDY_GUIDE_QUESTIONS } from './studyguide';

// CertIQ (app/certiq/*) reads from this array — flagged questions are appended
// here so they show up in CertIQ's Study Mode and Mock Test, not just the general bank.
export const STUDY_GUIDE_QUESTIONS: Question[] = [
  ...BASE_STUDY_GUIDE_QUESTIONS,
  ...flaggedQuestions,
];

export const ALL_QUESTIONS: Question[] = [
  ...domain1Questions,
  ...domain1bQuestions,
  ...domain1cQuestions,
  ...domain1scQuestions,
  ...domain1sc2Questions,
  ...domain2Questions,
  ...domain2bQuestions,
  ...domain2cQuestions,
  ...domain2scQuestions,
  ...domain2sc2Questions,
  ...domain3Questions,
  ...domain3bQuestions,
  ...domain3cQuestions,
  ...domain3dQuestions,
  ...domain3eQuestions,
  ...domain3fQuestions,
  ...domain3gQuestions,
  ...domain3scQuestions,
  ...domain3sc2Questions,
  ...domain4Questions,
  ...domain4bQuestions,
  ...domain4cQuestions,
  ...domain4dQuestions,
  ...domain4eQuestions,
  ...domain4fQuestions,
  ...domain4scQuestions,
  ...domain4sc2Questions,
  ...domain5Questions,
  ...domain5bQuestions,
  ...domain5cQuestions,
  ...domain5dQuestions,
  ...domain5eQuestions,
  ...domain5fQuestions,
  ...domain5gQuestions,
  ...domain5scQuestions,
  ...domain5sc2Questions,
  ...domain6Questions,
  ...domain6bQuestions,
  ...domain6cQuestions,
  ...domain6dQuestions,
  ...domain6eQuestions,
  ...domain6fQuestions,
  ...domain6scQuestions,
  ...domain6sc2Questions,
  ...domain7Questions,
  ...domain7bQuestions,
  ...domain7cQuestions,
  ...domain7dQuestions,
  ...domain7eQuestions,
  ...domain7fQuestions,
  ...domain7scQuestions,
  ...domain7sc2Questions,
  ...domain8Questions,
  ...domain8bQuestions,
  ...domain8cQuestions,
  ...domain8dQuestions,
  ...domain8eQuestions,
  ...domain8scQuestions,
  ...domain8sc2Questions,
  ...domain9Questions,
  ...domain9bQuestions,
  ...domain9cQuestions,
  ...domain9dQuestions,
  ...domain9scQuestions,
  ...domain9sc2Questions,
  ...domain10Questions,
  ...domain10bQuestions,
  ...domain10cQuestions,
  ...domain10dQuestions,
  ...domain10scQuestions,
  ...domain10sc2Questions,
  ...domain1PrepartoQuestions,
  ...domain2PrepartoQuestions,
  ...domain3PrepartoQuestions,
  ...domain4PrepartoQuestions,
  ...domain5PrepartoQuestions,
  ...domain6PrepartoQuestions,
  ...domain7PrepartoQuestions,
  ...domain8PrepartoQuestions,
  ...domain9PrepartoQuestions,
  ...domain10PrepartoQuestions,
  ...domain1ExamQuestions,
  ...domain2ExamQuestions,
  ...domain3ExamQuestions,
  ...domain4ExamQuestions,
  ...flaggedQuestions,
];
