import { useState, useEffect } from 'react';
import type { RootState, AppDispatch } from '../store';
import { initializeUserProjects } from './projects';
import { logIn, logOut } from '../reducers/userReducer';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import { setProjects, clearProjects } from '../reducers/projectReducer';
import { setPanels, clearPanels } from '../reducers/panelReducer';
import { setTheme, clearTheme } from '../reducers/themeReducer';
import { setPresets } from '../reducers/presetReducer';
import { loadPresets } from './loadPresets';
import { useNavigate, To } from 'react-router-dom';
import { apiFetch } from './apiFetch';
import { Project, Account } from './types';

/*
 * Generic custom hooks for reusing common functionality
 */

/**
 * Use this instead of plain `useDispatch`
 */
export const useAppDispatch: () => AppDispatch = useDispatch;

/**
 * Use this instead of plain `useSelector`
 */
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

/**
 * Custom hook for storing and validating a value with a Zod schema
 * Return the useState value, errors and function for changing the value
 * @example
 * const stringSchema = z.string().min(4)
 * const { value: username, errors: usernameErrors, changeValue: changeUsername} = useValue(stringSchema)
 *
 */
export const useValidation = (schema?: Zod.ZodType) => {
    // Value to keep track of
    const [value, setValue] = useState('');

    // Errors of the value
    let errors = '';

    if (schema) {
        const validated = schema.safeParse(value);
        if (!validated.success) {
            const formattedErrors = validated.error.format();
            errors = formattedErrors._errors.join(', ');
        }
    }

    return { value, errors, setValue };
};

/**
 * Custom hook which closes after N milliseconds
 * Can be closed and reopened manually
 */
export const useTimedOpen = (time: number) => {
    const [open, setOpen] = useState(false);

    useEffect(() => {
        const timer = setTimeout(() => setOpen(false), time);

        return () => {
            clearTimeout(timer);
        };
    }, [open]);

    return { open, setOpen };
};

/**
 * Custom hook for performing a fetch, and redirecting
 * the user on fail.
 */
export const useFetchRedirect = (fetchPath: string, redirect: To) => {
    const navigate = useNavigate();
    useEffect(() => {
        apiFetch(fetchPath).catch(() => navigate(redirect));
    });
};

/**
 * Fetch the user's logged in status,
 * and redirect to a login page if it fails (i.e. not logged in)
 *
 * A more specific version of fetchRedirect
 */
export const useLoginRedirect = () => useFetchRedirect('/api/user', '/login/');

/**
 * Callback to clear all data that is private to a user
 * Updates the redux store via dispatch
 */
export const useClearData = () => {
    const dispatch = useAppDispatch();
    return () => {
        // Can add clearing settings etc. in the future
        dispatch(clearTheme());
        dispatch(clearPanels());
        dispatch(clearProjects());
    };
};

/**
 * Import a project into the application
 * Updates the redux store via dispatch
 */
export const useImportProject = () => {
    const dispatch = useAppDispatch();
    return (project: Project) => {
        dispatch(setTheme(project.data.theme));
        dispatch(setPanels(project.data.panels));
    };
};

/**
 * Login and setup data in the redux store to the user's data
 */
export const useLogin = () => {
    const dispatch = useAppDispatch();
    const importProject = useImportProject();

    return async (acc: Account) => {
        dispatch(logIn(acc));

        // Load presets
        const presetRes = await loadPresets();
        if (presetRes.success) dispatch(setPresets(presetRes.presets));

        // Load projects
        const [project, projects] = await initializeUserProjects();
        dispatch(setProjects(projects));
        importProject(project);
    };
};

/**
 * Logs out the user and causes a clearing of user data that should be
 * inaccessible to a logged out user
 */
export const useLogout = () => {
    const dispatch = useAppDispatch();
    const clearData = useClearData();
    return async () => {
        dispatch(logOut());
        clearData();
    };
};
