'use client';

import React, { useState, useRef } from 'react';
import styles from './Contact.module.scss';
import Typography from '@/components/atoms/Typography/Typography';
import Button from '@/components/atoms/Button/Button';
import { SplitText } from '@/components/atoms/SplitText/SplitText';
import { Check, ArrowRight, ArrowLeft, MessageSquare, User, Mail, Briefcase, AlertCircle } from 'lucide-react';
import gsap from 'gsap';
import { clsx } from 'clsx';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { toast } from 'sonner';

const contactSchema = z.object({
  service: z.string().min(1, 'Por favor seleccione un servicio'),
  name: z.string().min(3, 'El nombre debe tener al menos 3 caracteres'),
  email: z.string().email('Correo electrónico no válido'),
  message: z.string().min(10, 'El mensaje debe tener al menos 10 caracteres')
});

type ContactFormData = z.infer<typeof contactSchema>;

const SERVICES = [
  'Consultoría Técnica',
  'Peritaje Judicial',
  'Avalúos',
  'Gestión de Proyectos',
  'Otro'
];

export default function Contact() {
  const [step, setStep] = useState(1);
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    trigger,
    formState: { errors, isValid }
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
    mode: 'onChange',
    defaultValues: {
      service: '',
      name: '',
      email: '',
      message: ''
    }
  });

  const formData = watch();
  const formRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const totalSteps = 3;

  const nextStep = async () => {
    let fieldsToValidate: (keyof ContactFormData)[] = [];
    if (step === 1) fieldsToValidate = ['service'];
    if (step === 2) fieldsToValidate = ['name', 'email'];

    const isStepValid = await trigger(fieldsToValidate);

    if (isStepValid && step < totalSteps) {
      gsap.to(formRef.current, {
        opacity: 0,
        x: -20,
        duration: 0.3,
        onComplete: () => {
          setStep(step + 1);
          gsap.fromTo(formRef.current, { opacity: 0, x: 20 }, { opacity: 1, x: 0, duration: 0.3 });
        }
      });
    } else if (!isStepValid) {
      toast.error('Por favor complete los campos requeridos correctamente');
    }
  };

  const prevStep = () => {
    if (step > 1) {
      gsap.to(formRef.current, {
        opacity: 0,
        x: 20,
        duration: 0.3,
        onComplete: () => {
          setStep(step - 1);
          gsap.fromTo(formRef.current, { opacity: 0, x: -20 }, { opacity: 1, x: 0, duration: 0.3 });
        }
      });
    }
  };

  const selectService = (service: string) => {
    setValue('service', service, { shouldValidate: true });
    setTimeout(nextStep, 400);
  };

  const onSubmit = (data: ContactFormData) => {
    const text = `*Nueva Consulta desde la Web*%0A%0A` +
      `*Nombre:* ${data.name}%0A` +
      `*Email:* ${data.email}%0A` +
      `*Servicio:* ${data.service}%0A` +
      `*Mensaje:* ${data.message}`;
    
    const whatsappUrl = `https://wa.me/50689984852?text=${text}`;
    
    toast.success('¡Formulario validado! Redirigiendo a WhatsApp...');
    
    setTimeout(() => {
      window.open(whatsappUrl, '_blank');
    }, 1000);
  };

  return (
    <section id="contacto" className={styles.contact} ref={containerRef}>
      <div className={styles.contact__container}>
        <div className={styles.contact__header}>
          <Typography id="contact-caption" variant="caption" color="accent" className={styles.contact__caption}>
            Contacto
          </Typography>
          <Typography id="contact-title" variant="h2" tag="h2" className={styles.contact__title}>
            <SplitText id="contact-title-split">¿Busca Claridad Técnica?</SplitText>
          </Typography>
          <p className={styles.contact__description}>
            Complete este breve formulario y nos pondremos en contacto con usted de inmediato.
          </p>
        </div>

        <div className={styles.contact__stepper}>
          {[1, 2, 3].map((s) => (
            <div 
              key={s} 
              className={clsx(styles.contact__step_indicator, {
                [styles.active]: step >= s
              })}
            >
              <div className={styles.contact__step_number}>
                {step > s ? <Check size={16} /> : s}
              </div>
              <div className={styles.contact__step_line} />
            </div>
          ))}
        </div>

        <div className={styles.contact__form_wrapper} ref={formRef}>
          {step === 1 && (
            <div className={styles.contact__step}>
              <Typography id="step1-title" variant="h3" className={styles.step_title}>
                <Briefcase size={20} className={styles.icon} />
                ¿En qué servicio está interesado?
              </Typography>
              <div className={styles.contact__services_grid}>
                {SERVICES.map((service) => (
                  <button
                    key={service}
                    type="button"
                    className={clsx(styles.service_button, {
                      [styles.selected]: formData.service === service
                    })}
                    onClick={() => selectService(service)}
                  >
                    {service}
                  </button>
                ))}
              </div>
            </div>
          )}

          {step === 2 && (
            <div className={styles.contact__step}>
              <Typography id="step2-title" variant="h3" className={styles.step_title}>
                <User size={20} className={styles.icon} />
                Cuéntenos sobre usted
              </Typography>
              <div className={clsx(styles.contact__group, errors.name && styles.error)}>
                <label className={styles.label}>Nombre Completo</label>
                <div className={styles.input_wrapper}>
                  <User size={18} className={styles.input_icon} />
                  <input
                    type="text"
                    {...register('name')}
                    placeholder="Ej. Juan Pérez"
                    className={styles.contact__input}
                  />
                </div>
                {errors.name && (
                  <span className={styles.error_message}>
                    <AlertCircle size={14} /> {errors.name.message}
                  </span>
                )}
              </div>
              <div className={clsx(styles.contact__group, errors.email && styles.error)}>
                <label className={styles.label}>Correo Electrónico</label>
                <div className={styles.input_wrapper}>
                  <Mail size={18} className={styles.input_icon} />
                  <input
                    type="email"
                    {...register('email')}
                    placeholder="juan@ejemplo.com"
                    className={styles.contact__input}
                  />
                </div>
                {errors.email && (
                  <span className={styles.error_message}>
                    <AlertCircle size={14} /> {errors.email.message}
                  </span>
                )}
              </div>
              <div className={styles.step_actions}>
                <Button id="btn-back-2" variant="outline" onClick={prevStep} className={styles.back_button}>
                  <ArrowLeft size={18} /> Atrás
                </Button>
                <Button 
                  id="btn-next-2"
                  variant="primary" 
                  onClick={nextStep} 
                  className={styles.next_button}
                >
                  Siguiente <ArrowRight size={18} />
                </Button>
              </div>
            </div>
          )}

          {step === 3 && (
            <form onSubmit={handleSubmit(onSubmit)} className={styles.contact__step}>
              <Typography id="step3-title" variant="h3" className={styles.step_title}>
                <MessageSquare size={20} className={styles.icon} />
                ¿En qué podemos ayudarle?
              </Typography>
              <div className={clsx(styles.contact__group, errors.message && styles.error)}>
                <label className={styles.label}>Su mensaje o consulta</label>
                <textarea
                  {...register('message')}
                  placeholder="Describa brevemente su requerimiento..."
                  className={styles.contact__textarea}
                  rows={5}
                />
                {errors.message && (
                  <span className={styles.error_message}>
                    <AlertCircle size={14} /> {errors.message.message}
                  </span>
                )}
              </div>
              <div className={styles.step_actions}>
                <Button id="btn-back-3" variant="outline" onClick={prevStep} className={styles.back_button}>
                  <ArrowLeft size={18} /> Atrás
                </Button>
                <Button 
                  id="btn-submit"
                  variant="primary" 
                  type="submit" 
                  className={styles.submit_button}
                >
                  Enviar a WhatsApp <ArrowRight size={18} />
                </Button>
              </div>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
