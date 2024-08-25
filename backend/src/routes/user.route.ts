import { Router } from 'express';
import validator from '../validation';
import { signInSchema, signUpSchema } from '../validation/user.validation';
import { signIn, signUp, viewProfile } from '../controller/user.controller';
import authorization from '../middleware/authorization';

const router = Router();

router.post('/signup', validator(signUpSchema, 'body'), signUp);
router.post('/signin', validator(signInSchema, 'body'), signIn);
router.get('/profile', authorization, viewProfile);

export default router;
